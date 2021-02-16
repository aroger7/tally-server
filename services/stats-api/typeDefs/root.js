const { gql } = require('apollo-server-lambda');

const root = gql`
  scalar Date
  scalar DateTime

  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = root;