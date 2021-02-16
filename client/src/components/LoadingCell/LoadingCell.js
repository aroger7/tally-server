import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

import useWindowSize from 'src/hooks/useWindowSize';
import { colors } from 'src/styles';

const LoadingCell = ({ value, isLoading }) => {
  const [cellWidth, setCellWidth] = useState(100);
  const windowSize = useWindowSize();
  const svgRef = useRef();

  useEffect(() => {
    if (svgRef && svgRef.current) {
      setCellWidth(svgRef.current.clientWidth);
    }
  }, [windowSize])

  return isLoading 
    ? (
      <div ref={svgRef}>
        <ContentLoader
          viewBox={`0 0 ${cellWidth} 13`}
          speed={1.2} 
          backgroundColor={colors.almostWhite}
          backgroundOpacity="0.3"
          foregroundColor="#dedede"
          foregroundOpacity="0.3"
          width="100%"
          height={13}
          role="img"
        >
          <rect x="0" y="0" rx="5" ry="5" width={cellWidth} height="13" />
        </ContentLoader>
      </div>
    )
    : <div>{value}</div>
};

LoadingCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  isLoading: PropTypes.bool
};

export default LoadingCell;
