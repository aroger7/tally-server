import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import RangeSelectorButton from 'src/components/RangeSelectorButton';
import RangeSelectorRangeButton from 'src/components/RangeSelectorRangeButton';

import * as Styles from './styles';

const RangeSelector = ({ start, end, updateMode, onChange, buttonComponent, rangeButtonComponent }) => {
  const [nextStart, setNextStart] = useState(null);
  const [nextEnd, setNextEnd] = useState(null);

  const ButtonComponent = buttonComponent;
  const RangeButtonComponent = rangeButtonComponent;

  const containerRef = useRef();
  const rangeRef = useRef();

  const handleStartDrag = ({ x }) => {
    const newStart = getStart(x);

    if (newStart < end) {
      const nextStart = newStart > 0 ? newStart : 0;
      if (updateMode === 'drag-end') {
        setNextStart(nextStart);
      } else {
        onChange({ start: nextStart, end });
      }
    }
  };

  const handleEndDrag = ({ x }) => {
    const newEnd = getEnd(x);

    if (newEnd > start) {
      const nextEnd = newEnd < 1 ? newEnd : 1;
      if (updateMode === 'drag-end') {
        setNextEnd(newEnd < 1 ? newEnd : 1);
      } else {
        onChange({ start, end: nextEnd });
      }
    }
  };

  const handleRangeDrag = ({ x }) => {
    const isMovingLeft = x < 0;
    if ((isMovingLeft && start > 0) || (end < 1)) {
      const currentGap = end - start;
      let newStart = null;
      let newEnd = null;

      if (isMovingLeft) {
        newStart = getStart(x);
        newEnd = newStart > 0
          ? getEnd(x)
          : newStart + currentGap;
      } else {
        newEnd = getEnd(x);
        newStart = newEnd < 1
          ? getStart(x)
          : newEnd - currentGap;
      }

      onChange?.({ start: newStart, end: newEnd });
    }
  };

  const handleDragEnd = () => {
    if (updateMode === 'drag-end') {
      onChange({ start: nextStart || start, end: nextEnd || end });
    }
  };

  const getStart = (x) => {
    const leftOffset = rangeRef.current.offsetLeft + x;
    return Math.max(leftOffset / containerRef.current.offsetWidth, 0);
  };

  const getEnd = (x) => {
    const leftOffset = rangeRef.current.offsetLeft + rangeRef.current.offsetWidth + x;
    return Math.min(leftOffset / containerRef.current.offsetWidth, 1);
  }

  return (
    <Styles.RangeSelector ref={containerRef} start={nextStart || start} end={nextEnd || end}>
      <Styles.RangeStartHiddenSection style={{ right: `${(1 - start) * 100}%` }}>
        <ButtonComponent position="start" onDrag={handleStartDrag} onDragEnd={handleDragEnd} />
      </Styles.RangeStartHiddenSection>
      <Styles.RangeSelectedSection ref={rangeRef} style={{ left: `${start * 100}%`, right: `${(1 - end) * 100}%` }}>
        <RangeButtonComponent onDrag={handleRangeDrag} />
      </Styles.RangeSelectedSection>
      <Styles.RangeEndHiddenSection style={{ left: `${end * 100}%` }}>
        <ButtonComponent position="end" onDrag={handleEndDrag} onDragEnd={handleDragEnd} />
      </Styles.RangeEndHiddenSection>
    </Styles.RangeSelector>
  )
};

RangeSelector.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  onChange: PropTypes.func,
  updateMode: PropTypes.oneOf(['drag', 'drag-end']),
  buttonComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  rangeButtonComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ])
};

RangeSelector.defaultProps = {
  start: 0,
  end: 1,
  buttonComponent: RangeSelectorButton,
  rangeButtonComponent: RangeSelectorRangeButton,
  onChange: () => null,
  updateMode: 'drag'
};

export default RangeSelector;
