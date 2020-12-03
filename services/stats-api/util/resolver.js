const { resolver } = require('graphql-sequelize');

exports.createDbResolver = (target, opts) => async (...args) => {
  let resolvedTarget = null;
  if (typeof target === 'string') {
    resolvedTarget = args[2].db.models[target];
  } else if (typeof target === 'function') {
    resolvedTarget = target(args[2].db);
  }
  return await resolver(resolvedTarget, opts)(...args);
}