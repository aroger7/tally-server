const { gql } = require('apollo-server-lambda');

const appList = gql`
  type AppList implements PagedList {
    totalCount: Int!
    filteredCount: Int!
    totalFilteredPages: Int!
    pageSize: Int!
    page: Int!
    apps: [App!]!
  }

  extend type Query {
    getApps(
      limit: Int! = 20 @range(min: 0, max: 100),
      page: Int! = 1 @range(min: 1),
      name: String
    ): AppList
  }
`;

module.exports = appList;