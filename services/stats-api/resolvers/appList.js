const { createDbResolver } = require('../util/resolver');

const appList = {
  Query: {
    getApps: createDbResolver('App', {
      list: true,
      before: async (findOptions, args, context) => {
        const { limit, page, name } = args;
        const { Sequelize: { Op } = {} } = context.db;

        findOptions.order = [['current', 'DESC']];
        findOptions.offset = limit * (page - 1);
        if (name) {
          findOptions.where.name = { [Op.iLike]: '%' + name + '%' };
        }
        context.totalCount = await context.db.models.App.count({});
        context.filteredCount = await context.db.models.App.count({ where: findOptions.where });
        context.totalFilteredPages = Math.ceil(context.filteredCount / limit);

        return findOptions;
      },
      after: async (result, args, context) => {
        const { totalCount, filteredCount, totalFilteredPages } = context;
        const appList = {
          totalCount,
          filteredCount,
          totalFilteredPages,
          pageSize: args.limit,
          page: args.page,
          apps: result
        }
        return appList;
      }
    })
  }
};

module.exports = appList;