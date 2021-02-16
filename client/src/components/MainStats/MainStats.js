import React from 'react';
import { useQuery } from '@apollo/client';

import LoadingCell from 'src/components/LoadingCell';
import SectionTitle from 'src/components/SectionTitle';
import SimpleTable from 'src/components/SimpleTable';

import { GET_TOP_TEN_APPS_QUERY } from './queries';
import * as Styles from './styles';

const columns = [
  {
    Header: '#',
    id: '#',
    accessor: (_, rowIndex) => rowIndex + 1,
    minWidth: 30,
    width: 50,
    maxWidth: 100,
    Cell: LoadingCell
  },
  {
    Header: 'Name',
    id: 'name',
    accessor: 'name',
    width: 300,
    Cell: LoadingCell
  },
  {
    Header: 'Current Players',
    id: 'current',
    width: 300,
    accessor: (row) => row.current && row.current.toLocaleString(),
    Cell: LoadingCell
  },
  {
    Header: '',
    id: 'filler',
    accessor: () => null
  }
];

const MainStats = () => {
  const { loading, error, data } = useQuery(GET_TOP_TEN_APPS_QUERY);
  return (
    <Styles.MainStats>
      <SectionTitle>abc1234</SectionTitle>
      <SimpleTable
        columns={columns}
        data={data && data.getApps && data.getApps.apps}
        isLoading={loading}
      />
    </Styles.MainStats>
  )
};

export default MainStats;