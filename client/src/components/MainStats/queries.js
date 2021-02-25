import { gql } from '@apollo/client';

export const GET_TOP_TEN_APPS_QUERY = gql`
  query GetTopTenApps {
    getApps(limit: 10) {
      totalCount,
      filteredCount
      pageSize,
      page
      apps {
        id,
        name,
        current,
        average24Hours,
        peak24Hours
      }
    }
  }
`;