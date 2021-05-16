import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseISO, subWeeks, endOfDay } from 'date-fns';

import CountChart from 'src/components/CountChart';
import ChartDateSelector from 'src/components/ChartDateSelector';

import * as Styles from './styles';

const CountTimelineChart = ({ hiResCounts, dailyCounts, displayName, id }) => {
  const dailyChartData = useMemo(() => (
    dailyCounts
      ?.map(({ year, month, day, average: count }) => {
        const time = new Date(year, month - 1, day).getTime();
        return { time, count };
      }) ?? []
  ), [dailyCounts]);

  const chartData = useMemo(() => {
    const mappedHiResCounts = hiResCounts
      ?.slice()
      .reverse()
      .filter(({ createdAt }, index, arr) => arr.findIndex(x => x.createdAt === createdAt) === index)
      .map(({ count, createdAt }) => ({
        count,
        time: parseISO(createdAt).getTime()
      })) ?? [];


      return {
        [id]: {
          displayName,
          points: [
            ...dailyChartData?.filter(({ time }) => time < mappedHiResCounts[0]?.time),
            ...mappedHiResCounts
          ]
        }
      };
  }, [hiResCounts, dailyChartData, displayName, id]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });

  const handleDateRangeChange = ({ startDate, endDate }) => {
    // setDateRange({ startDate, endDate });
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    const lastDailyPoint = dailyChartData[dailyChartData.length - 1];
    setStartDate(lastDailyPoint && subWeeks(lastDailyPoint.time, 1)?.getTime())
    setEndDate(lastDailyPoint?.time);
    // setDateRange({
    //   startDate: lastDailyPoint && subWeeks(lastDailyPoint.time, 1)?.getTime(),
    //   endDate: lastDailyPoint?.time
    // });
  }, [dailyChartData]);

  return (
    <Styles.CountTimelineChartContainer>
      <Styles.ChartSizingContainer>
        <CountChart
          data={chartData}
          startDate={startDate}
          endDate={endDate}
        />
      </Styles.ChartSizingContainer>
      <ChartDateSelector data={dailyChartData} startDate={startDate} endDate={endDate} onDateRangeChange={handleDateRangeChange} />
    </Styles.CountTimelineChartContainer>
  )
};

CountTimelineChart.propTypes = {
  hiResCounts: PropTypes.array,
  dailyCounts: PropTypes.array
}

export default CountTimelineChart;
