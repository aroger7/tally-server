import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TOP_TEN_APPS = gql`
  query GetTopTenApps {
    getApps(limit: 10) {
      totalCount,
      filteredCount
      pageSize,
      page
      apps {
        id,
        name
      }
    }
  }
`;

const Header = () => {
  const { loading, error, data } = useQuery(GET_TOP_TEN_APPS);
  
  useEffect(() => {
    console.log(error);
    console.log(data);
  }, [error, data])

  return (
    <div>
      {loading && <p>Loading...</p>}
    </div>
  )
};

export default Header;