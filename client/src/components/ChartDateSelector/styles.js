import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';

import { colors } from 'src/styles';

export const ChartDateSelectorContainer = styled.div`
  width: 100%;
  height: 3rem;
  position: relative;
  border-top: 1px solid ${rgba(colors.lightGrey, 0.3)};
`;

export const RangeSelectorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;