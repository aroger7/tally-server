const { gql } = require('apollo-server-lambda');

const app = gql`
  type App {
    id: Int!
    name: String!,
    current: Int!,
    average: Float!,
    average24Hours: Float,
    peak: Int!,
    peak24Hours: Int
    lastWeekCounts: [PlayerCount!]!
    dailyStats: [AppDay!]!
    monthlyStats: [AppMonth!]!
  }

  extend type Query {
    getApp(id: Int!): App
  }
`;

module.exports = app;