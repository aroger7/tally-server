import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const SearchBarDropdownItem = ({ id, name }) => {
    return (
      <Styles.SearchDropdownItem>
        <Styles.SearchDropdownItemLink href={`/apps/${id}`}>
          <Styles.SearchDropdownItemImage 
            src={`https://cdn.akamai.steamstatic.com/steam/apps/${id}/header.jpg`}
            alt="Game image"
          />
          <Styles.SearchDropdownItemText>
            {name}
          </Styles.SearchDropdownItemText>
        </Styles.SearchDropdownItemLink>
      </Styles.SearchDropdownItem>
    );
};

SearchBarDropdownItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string
};

export default SearchBarDropdownItem;
