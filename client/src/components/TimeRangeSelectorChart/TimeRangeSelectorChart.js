import React, { useMemo } from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { isValid, format, differenceInDays, subDays, startOfDay, endOfDay, addDays } from 'date-fns';

import { colors } from 'src/styles';

const tickFormatter = (time) => {
  const date = new Date(time);
  return isValid(date)
    ? format(date, 'MMM d')
    : time;
}

const yAxisTickFormatter = (count) => count.toLocaleString();

const margins = { top: 0, left: 0, bottom: 0, right: 0 };

const xAxisTickStyle = { fill: colors.lightGrey, fontSize: '0.75rem', textAnchor: 'start', dx: 4 }

const yAxisTickStyle = { width: '100px', fill: colors.lightGrey };

const TimeRangeSelectorChart = ({ data }) => {
  const minTime = data[0]?.time;
  const maxTime = data[data.length - 1]?.time;

  const domain = useMemo(() => [minTime, maxTime], [minTime, maxTime]);
  const ticks = useMemo(() => Array.from({ length: Math.ceil(differenceInDays(startOfDay(maxTime), startOfDay(minTime)) / 7) }).map((_, index) => subDays(startOfDay(maxTime), index * 7).getTime()), [minTime, maxTime]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={margins}>
        <Area type="monotone" dataKey="count" isAnimationActive={false} />
        <CartesianGrid stroke="#ccc" horizontal={false} stroke={colors.lightGrey} strokeOpacity={0.3} strokeWidth={1} />
        <XAxis
          dataKey="time"
          tickFormatter={tickFormatter}
          domain={domain}
          axisLine={false}
          fontSize={16}
          fontFamily="Roboto"
          tick={xAxisTickStyle}
          ticks={ticks}
          opacity={0.6}
          type="number"
          interval={0}
          mirror
        />
        <YAxis
          hide
          orientation="right"
          type="number"
          interval="preserveStartEnd"
          tickCount={5}
          width={75}
          axisLine={false}
          tickLine={false}
          tick={yAxisTickStyle}
          tickFormatter={yAxisTickFormatter}
          color={colors.sapphire}
          opacity={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TimeRangeSelectorChart;
