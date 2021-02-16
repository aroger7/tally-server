const { subDays } = require('date-fns');
const { createDbResolver } = require('../util/resolver');

const playerCount = {
  Query: {
    getAppLastMonthCounts: createDbResolver((db) => () => db.models.App.associations.playerCounts, {
      before: (findOptions, args) => {
        console.log(findOptions.where);
        return findOptions;
      }
    })
  }
}