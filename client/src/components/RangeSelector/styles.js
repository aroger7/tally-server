import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';

import { colors } from 'src/styles';

export const RangeSelector = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const RangeStartHiddenSection = styled.div`
  position: absolute;
  background-color: ${rgba(colors.black, 0.2)};
  left: 0;
  top: 0;
  bottom: 0;
`;

export const RangeEndHiddenSection = styled(RangeStartHiddenSection)`
  left: auto;
  right: 0;
`;

export const RangeSelectedSection = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
`;