import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import useDraggable from 'src/hooks/useDraggable';

import * as Styles from './styles';

const RangeSelectorButton = ({ onDrag, onDragStart, onDragEnd, position }) => {
  const buttonRef = useRef();
  useDraggable(buttonRef.current, { onDrag, onDragStart, onDragEnd });

  return (
    <Styles.RangeSelectorHandleButton ref={buttonRef} position={position}/>
  );
};

RangeSelectorButton.propTypes = {
  onDrag: PropTypes.func.isRequired,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  position: PropTypes.oneOf(['start', 'end'])
};

RangeSelectorButton.defaultProps = {
  position: 'start'
};

export default RangeSelectorButton;
