const { print } = require('graphql');
const root = require('./root');
const app = require('./app');
const appList = require('./appList');
const appDay = require('./appDay');
const pagedList = require('./pagedList');
const playerCount = require('./playerCount');

const typeDefs = [root, app, appList, appDay, pagedList, playerCount];

module.exports = typeDefs.map(x => print(x));