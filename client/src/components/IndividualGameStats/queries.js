import { gql } from '@apollo/client';

export const GET_APP_STATS = gql`
  query GetAppStats ($id: Int!) {
    getApp(id: $id) {
      id
      name
      current
      average24Hours
      peak24Hours
      peak
      lastWeekCounts {
        createdAt
        count
      }
      dailyStats {
        year
        month
        day
        average
      }
      monthlyStats {
        year
        month
        average
        peak
        gain
        percentGain
      }
    }
  }
`;