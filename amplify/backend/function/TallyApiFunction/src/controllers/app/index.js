const url = require('url');
const yup = require('yup');

const { getFilters } = require('../../services/filters');
const { getSortObjectFromQuery } = require('../../services/sort');

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
    const { rows: apps, count } = await req.db.models.App.findAndCountAll({
      order: [['current', 'DESC']],
      limit
    });

    res.json({ apps, count });
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

// exports.getPlayerCounts = (req, res) => {
//   const { id } = req.params;
//   App.findOne({ _id: id }).then(app => {
//     if (!app) {
//       res.status(404).send('App not found');
//     }

//     PlayerCount.find({ appId: id })
//       .sort({ _id: 1 })
//       .then(playerCounts => {
//         if (playerCounts) {
//           res.send({
//             playerCounts: playerCounts.map(playerCount => ({
//               time: playerCount._id.getTimestamp().getTime(),
//               count: playerCount.count
//             }))
//           });
//         }
//       });
//   });
// };