import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';

const SectionTitle = ({ children }) => {
  return (
    <Styles.SectionTitle>
      <Styles.SectionTitleText>
        {children}
      </Styles.SectionTitleText>
      <Styles.SectionTitleUnderline />
    </Styles.SectionTitle>
  )
};

SectionTitle.propTypes = {
  children: PropTypes.node
}

export default SectionTitle;
