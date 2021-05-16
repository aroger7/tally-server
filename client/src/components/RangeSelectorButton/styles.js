import styled from '@emotion/styled';

export const RangeSelectorHandleButton = styled.button`
  position: absolute;
  left: ${({ position }) => position === 'end' ? '-0.25rem' : 'auto'};
  right: ${({ position }) => position === 'end' ? 'auto' : '-0.25rem'};
  top: 50%;
  transform: translateY(-50%);
  min-width: 0;
  width: 0.5rem;
  height: 2rem;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  cursor: ew-resize;
`;