import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useDraggable from 'src/hooks/useDraggable';

import * as Styles from './styles';

const RangeSelectorRangeButton = ({ onDrag, onDragStart, onDragEnd }) => {
  const buttonRef = useRef();
  useDraggable(buttonRef.current, { onDrag, onDragStart, onDragEnd });

  return <Styles.RangeSelectorRangeButton ref={buttonRef} />
};

RangeSelectorRangeButton.propTypes = {
  onDrag: PropTypes.func.isRequired,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func
}

export default RangeSelectorRangeButton;
