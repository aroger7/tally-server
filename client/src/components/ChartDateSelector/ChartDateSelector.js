import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import RangeSelector from 'src/components/RangeSelector';
import TimeRangeSelectorChart from 'src/components/TimeRangeSelectorChart';

import * as Styles from './styles';

const ChartDateSelector = ({ data, startDate, endDate, onDateRangeChange }) => {
  const minTime = useMemo(() => data[0]?.time, [data]);
  const maxTime = useMemo(() => data[data.length - 1]?.time, [data]);
  const rangeInMs = useMemo(() => Math.abs(maxTime - minTime), [minTime, maxTime]);

  const start = (new Date(startDate).getTime() - minTime) / rangeInMs;
  const end = (new Date(endDate).getTime() - minTime) / rangeInMs;

  const handleRangeChange = ({ start, end }) => {
    onDateRangeChange?.({
      startDate: minTime + (rangeInMs * start),
      endDate: minTime + (rangeInMs * end)
    });
  };

  return (
    <Styles.ChartDateSelectorContainer>
      <TimeRangeSelectorChart data={data} />
      <Styles.RangeSelectorContainer>
        <RangeSelector
          start={start}
          end={end}
          onChange={handleRangeChange}
        />
      </Styles.RangeSelectorContainer>
    </Styles.ChartDateSelectorContainer>
  )
};

ChartDateSelector.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  startDate: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
  endDate: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
  onDateRangeChange: PropTypes.func
};

ChartDateSelector.defaultProps = {
  data: [],
  startDate: new Date(),
  endDate: new Date(),
  onDateRangeChange: () => null
};

export default ChartDateSelector;
