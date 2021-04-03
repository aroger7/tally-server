import { gql } from '@apollo/client';

export const SEARCH_APPS_BY_NAME = gql`
  query SearchAppsByName($name: String) {
    getApps(limit: 5, name: $name) {
      apps {
        id,
        name
      }
    }
  }
`;