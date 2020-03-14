const url = require('url');
const yup = require('yup');

const App = require('../models/App');
const PlayerCount = require('../models/PlayerCount');

const { getFilters } = require('../services/filters');
const { getSortObjectFromQuery } = require('../services/sort');

exports.getApps = async (req, res) => {
  const querySchema = yup.object().noUnknown().shape({
    limit: yup
      .number()
      .max(100)
      .default(20),
    page: yup
      .number()
      .min(1)
      .default(1),
    sort: yup.string().default('currentPlayerCount:desc'),
    name: yup
      .string()
      .max(255),
    currentPlayerCount: yup
      .object()
      .noUnknown()
      .notRequired()
      .shape({
        lt: yup.number(),
        gt: yup.number()
      })
      .default(undefined),
    average: yup
      .object()
      .noUnknown()
      .notRequired()
      .shape({
        lt: yup.number(),
        gt: yup.number()
      })
      .default(undefined),
    peak: yup
      .object()
      .noUnknown()
      .notRequired()
      .shape({
        lt: yup.number(),
        gt: yup.number()
      })
      .default(undefined),
  });

  try {
    const { 
      limit,
      page,
      sort,
      currentPlayerCount,
      ...queryFields 
    } = await querySchema.validate(req.query, { stripUnknown: false });
    const apps = await App.aggregate([
      { $match: getFilters(queryFields) },
      { $sort: getSortObjectFromQuery(sort) },
      { 
        $facet: {
          apps: [
            { $skip: (page - 1) * limit },
            { $limit: limit }
          ],
          total: [{ $count: 'total' }]
        }
      },
      { 
        $project: {
          _id: 0,
          total: { $arrayElemAt: [ '$total.total', 0] },
          totalPages: {
            $ceil: {
              $divide: [ { $arrayElemAt: [ '$total.total', 0] }, limit ]
            }
          },
          nextPage: {
            $concat: [ `${req.protocol}://${req.get('host')}${url.parse(req.originalUrl)}?limit=${limit}&page=${page + 1}`]
          },
          apps: 1,
        }
      }
    ]);
    res.send({ apps });
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log(err);
      return res.status(400).send({ error: err.message });
    }

    console.log(err.message);
    res.status(500).send();
  }
};

exports.getApp = (req, res) => {
  App.findOne({ _id: req.params.id })
    .then(app => {
      if (app) {
        res.send({ app });
      }
    });
};

exports.getPlayerCounts = (req, res) => {
  const { id } = req.params;
  App.findOne({ _id: id }).then(app => {
    if (!app) {
      res.status(404).send('App not found');
    }

    PlayerCount.find({ appId: id })
      .sort({ _id: 1 })
      .then(playerCounts => {
        if (playerCounts) {
          res.send({
            playerCounts: playerCounts.map(playerCount => ({
              time: playerCount._id.getTimestamp().getTime(),
              count: playerCount.count
            }))
          });
        }
      });
  });
};
