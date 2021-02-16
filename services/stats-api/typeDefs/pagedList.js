const { gql } = require('apollo-server-lambda');

const pagedList = gql`
  interface PagedList {
    totalCount: Int!
    filteredCount: Int!
    totalFilteredPages: Int!
    pageSize: Int!
    page: Int!
  }
`;

module.exports = pagedList;