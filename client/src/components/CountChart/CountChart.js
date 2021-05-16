import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, isValid, differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears, subDays, subWeeks, subMonths, subYears, startOfDay, startOfWeek, startOfMonth, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear } from 'date-fns';

import { colors } from 'src/styles';

const getTickMode = (startDate, endDate) => {
  return Object.keys(tickModes)
    .find(tickMode => tickModeHelpers[tickMode].validator(new Date(startDate), new Date(endDate)));
};

const tickModes = {
  daily: 'daily',
  weekly: 'weekly',
  biweekly: 'biweekly',
  monthly: 'monthly',
  bimonthly: 'bimonthly',
  yearly: 'yearly'
};

const tickModeHelpers = {
  [tickModes.daily]: {
    validator: (startDate, endDate) => differenceInWeeks(endDate, startDate) <= 2,
    getTicks: (startDate, endDate) => Array.from({
      length: differenceInDays(startOfDay(endDate), startOfDay(startDate))
    })
      .map((_, index) => subDays(startOfDay(endDate), index)),
    format: 'MMM d'
  },
  [tickModes.weekly]: {
    validator: (startDate, endDate) => differenceInMonths(endDate, startDate) <= 2,
    getTicks: (startDate, endDate) => Array.from({
      length: differenceInWeeks(startOfWeek(endDate), startOfWeek(startDate))
    })
      .map((_, index) => subWeeks(startOfWeek(endDate), index)),
    format: 'MMM d'
  },
  [tickModes.biweekly]: {
    validator: (startDate, endDate) => differenceInMonths(endDate, startDate) <= 4,
    getTicks: (startDate, endDate) => Array.from({
      length: Math.ceil((differenceInWeeks(startOfWeek(endDate), startOfWeek(startDate))) / 2)
    })
      .map((_, index) => subWeeks(startOfWeek(endDate), index * 2)),
    format: 'MMM d'
  },
  [tickModes.monthly]: {
    validator: (startDate, endDate) => differenceInMonths(endDate, startDate) <= 12
  },
  [tickModes.bimonthly]: {
    validator: (startDate, endDate) => differenceInYears(endDate, startDate) <= 2
  },
  [tickModes.yearly]: {
    validator: (startDate, endDate) => differenceInYears(endDate, startDate) > 2
  }
};

const lineChartMargins = { top: 16, bottom: 16 };

const xAxisTickStyle = { fill: colors.lightGrey };

const yAxisTickStyle = { width: '200px', fill: colors.lightGrey };

const xAxisTickFormatter = (time) => {
  const date = new Date(time);
  return isValid(date)
    ? format(date, 'MMM d')
    : time;
};

const yAxisTickFormatter = (count) => count.toLocaleString();

const tooltipFormatter = (value, name) => [value.toLocaleString(undefined, { maximumFractionDigits: 0 }), data[name]?.displayName ?? name];

const CountChart = ({ data, startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);
  const [tickMode, setTickMode] = useState(tickModes.daily);

  useEffect(() => {
    const dataKeys = Object.keys(data ?? {});
    const pointsByTime = dataKeys.reduce((acc, key) => {
      const { points } = data[key];
      points?.forEach(({ count, time }) => {
        if (count >= 0 && time) {
          const mergedPoints = acc[time] ?? {};
          mergedPoints[key] = count;
          acc[time] = mergedPoints;
        }
      });

      return acc;
    }, {});

    const times = Object.keys(pointsByTime)
      .map(key => parseInt(key))
      .sort((a, b) => a - b);

    const chartData = times.map((time) => {
      const points = pointsByTime[time];
      return {
        ...points,
        time
      };
    });

    setChartData(chartData);
    setTickMode(getTickMode(times[0] ?? 'auto', times[times?.length - 1] ?? 'auto'));
  }, [data]);

  const ticks = useMemo(() => tickModeHelpers[tickMode]?.getTicks(new Date(startDate).getTime(), new Date(endDate).getTime()) ?? [], [tickMode, startDate, endDate]);

  const Lines = useMemo(() => {
    return Object.keys(data ?? {})
      .map(key => {
        return (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors.cornflowerBlue}
            dot={false}
            strokeWidth={3}
          />
        )
      });
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={lineChartMargins}>
        {Lines}
        <CartesianGrid stroke="#ccc" vertical={false} stroke={colors.lightGrey} strokeOpacity={0.3} strokeWidth={3} />
        <Tooltip
          formatter={(value, name) => [value.toLocaleString(undefined, { maximumFractionDigits: 0 }), data[name]?.displayName ?? name]}
          labelFormatter={(time) => format(new Date(time), 'MMM d, h:mmaaa')}
        />
        <XAxis
          dataKey="time"
          tickFormatter={xAxisTickFormatter}
          domain={[
            new Date(startDate).getTime(),
            new Date(endDate).getTime()
          ]}
          axisLine={false}
          fontSize={16}
          fontFamily="Roboto"
          tick={xAxisTickStyle}
          tickSize={10}
          opacity={1}
          type="number"
          tickCount={ticks.length}
          ticks={ticks}
          allowDataOverflow
        />
        <YAxis
          orientation="right"
          type="number"
          interval="preserveStartEnd"
          axisLine={false}
          tickLine={false}
          tick={yAxisTickStyle}
          tickFormatter={yAxisTickFormatter}
          fontSize={16}
          fontFamily="Roboto"
          color={colors.sapphire}
          opacity={1}
        />
      </LineChart>
    </ResponsiveContainer>
  )
};

CountChart.propTypes = {
  data: PropTypes.object
}

export default CountChart;
