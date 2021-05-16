import styled from '@emotion/styled'

export const IndividualGameStats = styled.main`
  display: grid;
  max-width: 100vw;
  min-height: 100%;
  padding: 1rem 1.5rem 1.5rem;
  box-sizing: border-box;
  grid-template-rows: auto auto auto 1fr;
  grid-template-columns: 1fr;
  gap: 1rem;
  overflow-y: auto;
`;

export const MetricCardsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  grid-column: 1;
  grid-row: 2;
`;

export const MetricCardContainer = styled.div`
  flex: 0 0 21rem;
`;

export const HistoryChartContainer = styled.section`
  grid-column: 1;
  grid-row: 3;
  height: 100%;
  min-width: 0;
  max-width: 100%;
`;

export const HistoryChartSizingContainer = styled.div`
  width: 100%;
  height: 300px;
  max-width: 100%;
  min-width: 0;
`;

export const MonthlyStatsContainer = styled.section`
  grid-column: 1;
  grid-row: 4;
  width: 100%;
`;