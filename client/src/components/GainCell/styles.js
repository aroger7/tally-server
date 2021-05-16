import styled from '@emotion/styled';

import { colors } from 'src/styles';

export const GainText = styled.p`
  color: ${({ isPositive }) => isPositive ? colors.green : colors.red};
`;