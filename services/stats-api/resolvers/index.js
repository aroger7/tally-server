const merge = require('lodash.merge');
const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date');
const app = require('./app');
const appList = require('./appList');

const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime
};

module.exports = merge(resolvers, app, appList);