const { createDbResolver } = require('../util/resolver');
const { subDays } = require('date-fns');

const app = {
  Query: {
    getApp: createDbResolver('App')
  },
  App: {
    lastWeekCounts: createDbResolver((db) => () => db.models.App.associations.playerCounts, {
      before: (findOptions, _, context) => {
        const { Sequelize: { Op } = {} } = context.db;
        console.log('blah');

        findOptions.where = {
          createdAt: {
            [Op.gte]: subDays(new Date(), 7)
          }
        };
        findOptions.order = [['createdAt', 'DESC']];
        return findOptions;
      }
    }),
    dailyStats: createDbResolver((db) => () => db.models.App.associations.appDays, {
      before: (findOptions)  => {
        findOptions.order = [['year', 'ASC'], ['month', 'ASC'], ['day', 'ASC']];
        return findOptions;
      }
    })
  }
};

module.exports = app;