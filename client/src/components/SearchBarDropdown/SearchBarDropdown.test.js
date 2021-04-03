import { render, screen, within, waitFor } from '@testing-library/react';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import SearchBarDropdown from './SearchBarDropdown';
import { SEARCH_APPS_BY_NAME } from './queries';

describe('SearchBarDropdown', () => {
  const apps = [
    { id: 120, name: 'Game 1' },
    { id: 121, name: 'Game 2' },
    { id: 122, name: 'Game 3' },
    { id: 123, name: 'Game 4' },
    { id: 124, name: 'Game 5' }
  ];
  const defaultMocks = [
    {
      request: {
        query: SEARCH_APPS_BY_NAME,
        variables: {
          name: 'game'
        }
      },
      result: {
        data: {
          getApps: {
            apps
          }
        }
      }
    }
  ];

  it('should show a message when there are no results', async () => {
    const mocks = [
      {
        ...defaultMocks[0],
        result: {
          data: {
            getApps: {
              apps: []
            }
          }
        }
      }
    ];

    render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchBarDropdown searchValue="game" />
      </MockedProvider>
    ));

    expect(await screen.findByText('No results')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('should render a list of items', async () => {
    render((
      <MockedProvider mocks={defaultMocks} addTypename={false}>
        <SearchBarDropdown searchValue="game" />
      </MockedProvider>
    ));

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(apps.length);
      listItems.forEach((listItem, index) => {
        const listItemEl = within(listItem);
        const { name } = apps[index];
        expect(listItemEl.getByText(name)).toBeInTheDocument();
      });
    });
  });
});
