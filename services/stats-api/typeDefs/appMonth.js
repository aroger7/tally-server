const { gql } = require('apollo-server-lambda');

const appMonth = gql`
  type AppMonth {
    year: Int!
    month: Int!
    average: Float
    peak: Int
    gain: Float
    percentGain: Float
    appId: Int!
  }
`;

module.exports = appMonth;