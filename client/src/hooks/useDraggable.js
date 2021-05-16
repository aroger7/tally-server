import { useState, useCallback, useRef, useEffect } from 'react';
import useEventListener from '@use-it/event-listener';

const useDraggable = (element, { onDrag, onDragStart, onDragEnd }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [nextDragEvent, setNextDragEvent] = useState({ evt: null, x: 0, y: 0 });
  const lastCoords = useRef({ x: null, y: null });

  const handleMouseDown = useCallback((evt) => {
    if (element) {
      setIsDragging(true);
      lastCoords.current = { x: evt.clientX, y: evt.clientY };
    }
  }, [setIsDragging, onDragStart, element]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging, setIsDragging, onDragEnd]);

  const handleMouseMove = (evt) => {
    if (isDragging) {
      const x = evt.clientX - lastCoords.current.x;
      const y = evt.clientY - lastCoords.current.y;
      lastCoords.current = { x: evt.clientX, y: evt.clientY };

      if (x !== 0 || y !== 0) {
        setNextDragEvent({ evt, x, y });
      }
    }
  };

  useEffect(() => isDragging ? onDragStart?.() : onDragEnd?.(), [isDragging]);
  useEffect(() => onDrag?.(nextDragEvent), [nextDragEvent]);

  useEventListener('mousedown', handleMouseDown, element);
  useEventListener('mouseup', handleMouseUp);
  useEventListener('mousemove', handleMouseMove);

  return { isDragging };
};

export default useDraggable;