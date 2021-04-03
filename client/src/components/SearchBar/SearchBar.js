import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SearchBarDropdown from 'src/components/SearchBarDropdown';

import * as Styles from './styles';

const SearchBar = ({ }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (evt) => evt && evt.target && setSearchValue(evt.target.value);

  return (
    <Styles.SearchBarContainer>
      <Styles.SearchInput 
        value={searchValue}
        onChange={handleSearchValueChange}
        placeholder="Search..."
      />
      <Styles.SearchDropdownContainer>
        <SearchBarDropdown searchValue={searchValue} />
      </Styles.SearchDropdownContainer>
    </Styles.SearchBarContainer>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
