import React from 'react';
import PropTypes from 'prop-types';

import LoadingCell from 'src/components/LoadingCell';

import * as Styles from './styles';

const GainCell = ({ value, isPercentage, isLoading, decimalPlaces }) => {
  const valueString = value?.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  }) ?? '';
  const percent = value && isPercentage ? '%' : '';
  const formattedValue = `${valueString}${percent}`;

  const Value = () => <Styles.GainText isPositive={value > 0}>{formattedValue}</Styles.GainText>
  return (
    <LoadingCell
      value={<Value />}
      isLoading={isLoading}
    />
  );
};

GainCell.propTypes = {
  value: PropTypes.number,
  isPercentage: PropTypes.bool,
  isLoading: PropTypes.bool,
  decimalPlaces: PropTypes.number
};

GainCell.defaultProps = {
  decimalPlaces: 2
}

export default GainCell;
