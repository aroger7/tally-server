import React from 'react';
import PropTypes from 'prop-types';
import SimpleTable from 'src/components/SimpleTable';

import columns from './columns';

const MonthlyGameStatsTable = ({ months, isLoading }) => {
  return (
    <SimpleTable 
      columns={columns}
      data={months}
      isLoading={isLoading}
      numLoadingRows={5}
    />
  )
};

MonthlyGameStatsTable.propTypes = {
  months: PropTypes.arrayOf(PropTypes.object)
};

export default MonthlyGameStatsTable;
