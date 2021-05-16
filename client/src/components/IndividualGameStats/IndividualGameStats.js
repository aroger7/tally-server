import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CountTimelineChart from 'src/components/CountTimelineChart';
import MonthlyGameStatsTable from 'src/components/MonthlyGameStatsTable';
import SectionTitle from 'src/components/SectionTitle';
import SingleMetricCard from 'src/components/SingleMetricCard';

import { GET_APP_STATS } from './queries';
import * as Styles from './styles';

const IndividualGameStats = ({ }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_APP_STATS, {
    variables: {
      id: parseInt(id)
    }
  });

  const {
    name,
    current,
    peak24Hours,
    peak,
    lastWeekCounts,
    dailyStats,
    monthlyStats
  } = data?.getApp ?? {};

  return (
    <Styles.IndividualGameStats>
      <SectionTitle>{name}</SectionTitle>
      <Styles.MetricCardsContainer>
        <Styles.MetricCardContainer>
          <SingleMetricCard title="Current Players" isLoading={loading}>{current}</SingleMetricCard>
        </Styles.MetricCardContainer>
        <Styles.MetricCardContainer>
          <SingleMetricCard title="24-hour Peak" isLoading={loading}>{peak24Hours}</SingleMetricCard>
        </Styles.MetricCardContainer>
        <Styles.MetricCardContainer>
          <SingleMetricCard title="All-time Peak" isLoading={loading}>{peak}</SingleMetricCard>
        </Styles.MetricCardContainer>
      </Styles.MetricCardsContainer>
      <Styles.HistoryChartContainer>
        <SingleMetricCard title="History" isLoading={loading}>
          <CountTimelineChart
            hiResCounts={lastWeekCounts}
            dailyCounts={dailyStats}
            displayName={name}
            id={id}
          />
        </SingleMetricCard>
      </Styles.HistoryChartContainer>
      <Styles.MonthlyStatsContainer>
        <SingleMetricCard title="Month-by-Month">
          <MonthlyGameStatsTable months={monthlyStats} isLoading={loading} />
        </SingleMetricCard>
      </Styles.MonthlyStatsContainer>
    </Styles.IndividualGameStats>
  );
};

export default IndividualGameStats;
