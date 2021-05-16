const { gql } = require('apollo-server-lambda');

const appDay = gql`
  type AppDay {
    appId: Int!
    year: Int!
    month: Int!
    day: Int!
    peak: Int!
    average: Float!
    gain: Float!
    percentGain: Float!
  }

  extend type Query {
    getAppDays(appId: Int!): [AppDay!]!
  }
`;

module.exports = appDay;