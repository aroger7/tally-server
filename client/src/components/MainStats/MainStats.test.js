import { render, screen, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import MainStats from './MainStats';
import { GET_TOP_TEN_APPS_QUERY } from './queries';

describe('MainStats', () => {
  const mocks = [
    {
      request: {
        query: GET_TOP_TEN_APPS_QUERY
      },
      result: {
        data: {
          getApps: {
            totalCount: 10000,
            filteredCount: 5000,
            pageSize: 10,
            page: 1,
            apps: [
              { id: 1, name: 'App 1', current: 10 },
              { id: 2, name: 'App 2', current: 9 },
              { id: 3, name: 'App 3', current: 8 },
              { id: 4, name: 'App 4', current: 7 },
              { id: 5, name: 'App 5', current: 6 },
              { id: 6, name: 'App 6', current: 5 },
              { id: 7, name: 'App 7', current: 4 },
              { id: 8, name: 'App 8', current: 3 },
              { id: 9, name: 'App 9', current: 2 },
              { id: 10, name: 'App 10', current: 1 },
            ]
          }
        }
      }
    }
  ]

  it('should have a title', () => {
    render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainStats />
      </MockedProvider>
    ));

    expect(screen.getByRole('heading', { name: /Right Now/ })).toBeInTheDocument();
  });

  it('should display a player count table', () => {
    render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainStats />
      </MockedProvider>
    ));

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should display loading cells', () => {
    render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainStats />
      </MockedProvider>
    ));

    expect(within(screen.getByRole('table')).getAllByRole('img')).not.toHaveLength(0);
  });

  it('should display a header', () => {
    render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainStats />
      </MockedProvider>
    ));

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: /#/ })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: /Name/ })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: /Current Players/ })).toBeInTheDocument();
  });

  it('should display player counts', async () => {
    render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainStats />
      </MockedProvider>
    ));

    const table = await screen.findByRole('table');
    const rows = (await within(table).findAllByRole('row')).slice(1);
    expect(rows).toHaveLength(10);
    rows.forEach((row, index) => {
      expect(within(row).getByRole('cell', { name: `${index + 1}` })).toBeInTheDocument();
      expect(within(row).getByRole('cell', { name: `App ${index + 1}` })).toBeInTheDocument();
      expect(within(row).getByRole('cell', { name: rows.length - index })).toBeInTheDocument();
    });
  });
})