import { render, screen, within, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import MainStats from './MainStats';
import { GET_TOP_TEN_APPS_QUERY } from './queries';

describe('MainStats', () => {
  const apps = [
    { id: 1, name: 'App 1', current: 10913, average24Hours: 102334.1, peak24Hours: 102343 },
    { id: 2, name: 'App 2', current: 92345, average24Hours: 9345.13, peak24Hours: 9234234 },
    { id: 3, name: 'App 3', current: 84123, average24Hours: 823423.123123, peak24Hours: 8123 },
    { id: 4, name: 'App 4', current: 77846, average24Hours: 72234.12312, peak24Hours: 723423 },
    { id: 5, name: 'App 5', current: 634523, average24Hours: 6.23123, peak24Hours: 6123 },
    { id: 6, name: 'App 6', current: 545342, average24Hours: 5.423, peak24Hours: 5423 },
    { id: 7, name: 'App 7', current: 4123434, average24Hours: 4342.12312, peak24Hours: 412312 },
    { id: 8, name: 'App 8', current: 3234556, average24Hours: 323424.123, peak24Hours: 334234 },
    { id: 9, name: 'App 9', current: 2435, average24Hours: 2131.43123, peak24Hours: 2123 },
    { id: 10, name: 'App 10', current: 1234, average24Hours: 12345.67, peak24Hours: 1234234 },
  ];
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
            apps
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

    expect(screen.getByRole('heading', { name: 'Right Now' })).toBeInTheDocument();
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
    expect(within(table).getByRole('columnheader', { name: /24-hr Average/ })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: /24-hr Peak/ })).toBeInTheDocument();
  });

  it('should display player counts', async () => {
    render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainStats />
      </MockedProvider>
    ));

    const table = await screen.findByRole('table');
    await waitFor(() => expect(within(table).queryAllByRole('img')).toHaveLength(0));
    const rows = within(table).getAllByRole('row').slice(1);
    expect(rows).toHaveLength(10);
    apps.forEach((app, index) => {
      const row = rows[index];
      expect(row).toBeInTheDocument();
      const [rank, name, current, average24Hours, peak24Hours] = within(row).getAllByRole('cell');
      const currentText = app.current.toLocaleString();
      const average24HoursText = app.average24Hours.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const peak24HoursText = app.peak24Hours.toLocaleString();

      expect(within(rank).getByText(app.id)).toBeInTheDocument();
      expect(within(name).getByText(app.name)).toBeInTheDocument();
      expect(within(current).getByText(currentText)).toBeInTheDocument();
      expect(within(average24Hours).getByText(average24HoursText)).toBeInTheDocument();
      expect(within(peak24Hours).getByText(peak24HoursText)).toBeInTheDocument();
    });
  });
})