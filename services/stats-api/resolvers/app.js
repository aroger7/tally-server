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
        const endDate = new Date();
        const startDate = subDays(endDate, 7);

        findOptions.where = {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
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