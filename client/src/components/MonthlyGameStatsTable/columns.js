import React from 'react';
import { isValid, format } from 'date-fns';

import GainCell from 'src/components/GainCell';
import LoadingCell from 'src/components/LoadingCell';

export default [
  {
    Header: 'Month',
    id: 'month',
    accessor: ({ year, month}) => {
      const date = new Date(year, month - 1);
      return isValid(date) 
        ? format(date, 'MMMM y') 
        : null;
    },
    width: 200,
    Cell: LoadingCell
  },
  {
    Header: 'Average',
    id: 'average',
    accessor: ({ average }) => average?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    width: 150,
    Cell: LoadingCell
  },
  {
    Header: 'Gain',
    id: 'gain',
    width: 150,
    accessor: 'gain',
    Cell: ({ value, isLoading }) => <GainCell value={value} isLoading={isLoading} />
  },
  {
    Header: 'Percent Gain',
    id: 'percentGain',
    width: 150,
    accessor: 'percentGain',
    Cell: ({ value, isLoading }) => <GainCell value={value} isLoading={isLoading} isPercentage />
  },
  {
    Header: 'Peak',
    id: 'peak',
    width: 150,
    accessor: ({ peak }) => peak?.toLocaleString(),
    Cell: LoadingCell 
  },
  {
    Header: '',
    id: 'filler',
    accessor: () => null
  }
];