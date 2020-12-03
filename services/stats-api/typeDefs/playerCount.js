const { gql } = require('apollo-server-lambda');

const playerCount = gql`
  type PlayerCount {
    appId: Int!,
    count: Int,
    createdAt: DateTime!
  }

  extend type Query {
    getAppLastMonthCounts(appId: Int!): [PlayerCount!]!
  }
`;

module.exports = playerCount;