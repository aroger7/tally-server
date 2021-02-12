import React from 'react';
import { useQuery, gql } from '@apollo/client';

import LoadingCell from 'components/LoadingCell';
import SectionTitle from 'components/SectionTitle';
import SimpleTable from 'components/SimpleTable';

import * as Styles from './styles';

const GET_TOP_TEN_APPS = gql`
  query GetTopTenApps {
    getApps(limit: 10) {
      totalCount,
      filteredCount
      pageSize,
      page
      apps {
        id,
        name,
        current
      }
    }
  }
`;

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
  const { loading, error, data } = useQuery(GET_TOP_TEN_APPS);

  return (
    <Styles.MainStats>
      <SectionTitle>Right Now</SectionTitle>
      <SimpleTable
        columns={columns}
        data={data && data.getApps && data.getApps.apps}
        isLoading={loading}
      />
    </Styles.MainStats>
  )
};

export default MainStats;