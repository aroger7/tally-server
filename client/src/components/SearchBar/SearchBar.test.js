import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import SearchBar from './SearchBar';
import { SEARCH_APPS_BY_NAME } from '../SearchBarDropdown/queries';

describe('SearchBar', () => {
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

  it('should render a dropdown', async () => {
    render((
      <MockedProvider mocks={defaultMocks}>
        <SearchBar />
      </MockedProvider>
    ));

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'game' } });
    expect(await screen.findByRole('list')).toBeInTheDocument();
  });
});
