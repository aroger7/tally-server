import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

import Card from 'src/components/Card';
import { colors } from 'src/styles';

import * as Styles from './styles';

const SingleMetricCard = ({ title, children, isLoading }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ height: 48 }}>
          <ContentLoader
            viewBox={'0 0 300 100'}
            speed={1.2} 
            backgroundColor={colors.almostWhite}
            backgroundOpacity="0.3"
            foregroundColor="#dedede"
            foregroundOpacity="0.3"
            width="100%"
            height="100%"
            role="img"
            preserveAspectRatio="none"
          >
            <rect x="0" y="0" rx="10" ry="10" width="300" height="100" />
          </ContentLoader>
        </div>
      );
    }

    const isMetricNode = typeof children !== 'number' && typeof children !== 'string';
    const formattedMetric = typeof children === 'number' 
      ? children.toLocaleString()
      : children;

    return isMetricNode
      ? children
      : <Styles.MetricsText>{formattedMetric}</Styles.MetricsText>;
  };

  return (
    <Card>
      <Styles.ContentContainer>
        <Styles.TitleText>{title}</Styles.TitleText>
        {renderContent()}
      </Styles.ContentContainer>
    </Card>
  )
};

SingleMetricCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  isLoading: PropTypes.bool
}

export default SingleMetricCard;
