import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'use-debounce';

import SearchBarDropdownItem from 'src/components/SearchBarDropdownItem';
import SearchLoaderItem from 'src/components/SearchLoaderItem';

import { SEARCH_APPS_BY_NAME } from './queries';
import * as Styles from './styles';

const SearchBarDropdown = ({ searchValue }) => {
  const [results, setResults] = useState(null);
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const [searchAppsByName, { loading, error, data }] = useLazyQuery(SEARCH_APPS_BY_NAME);
  const isOpen = loading || (results);

  useEffect(() => {
    const search = async () => {
      await searchAppsByName({ variables: { name: debouncedSearchValue } });
    };

    if (debouncedSearchValue) {
      search();
    } else {
      setResults(null);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    data && data.getApps && data.getApps.apps && setResults(data.getApps.apps);
  }, [data]);

  const renderItems = () => {
    let items = null;
    if (loading) {
      items = Array.from({ length: 5 }).map((_, index) => <SearchLoaderItem key={`search-loader-${index}`} />);
    } else if (results) {
      items = results?.length === 0 
        ? <Styles.NoResultsItem>No results</Styles.NoResultsItem>
        : (
          results.map(({ id, name }) => (
            <SearchBarDropdownItem
              key={`search-result-${id}`}
              id={id}
              name={name}
            />
          ))
        );
    }

    return items;
  }

  return (
    <Styles.SearchDropdownList isOpen={isOpen}>
      {renderItems()}
    </Styles.SearchDropdownList>
  );
};

SearchBarDropdown.propTypes = {
  searchValue: PropTypes.string
}

export default SearchBarDropdown;
