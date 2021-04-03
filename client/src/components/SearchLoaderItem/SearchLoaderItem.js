import React from 'react';
import ContentLoader from 'react-content-loader';

import { colors } from 'src/styles'

import * as Styles from './styles';

const SearchLoaderItem = ({}) => {
    return (
      <Styles.SearchLoaderItem>
        <ContentLoader
          viewBox={`0 0 100 48`}
          speed={1.2} 
          backgroundOpacity="1"
          foregroundOpacity="1"
          width="100%"
          height="3rem"
          preserveAspectRatio="none"
          role="img"
        >
          <rect x="0" y="0" width="26" height="48" />
          <rect x="30" y="15" width="65" height="16" />
        </ContentLoader>
      </Styles.SearchLoaderItem>
    )
};

export default SearchLoaderItem;
