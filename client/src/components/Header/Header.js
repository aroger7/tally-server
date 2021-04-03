import React, { useState, useEffect } from 'react';

import SearchBar from 'src/components/SearchBar';

import * as Styles from './styles';

const Header = () => {
  return (
    <Styles.Header>
      <div></div>
      <SearchBar />
    </Styles.Header>
  )
};

export default Header;