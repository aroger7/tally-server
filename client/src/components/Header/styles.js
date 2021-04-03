import styled from '@emotion/styled';
import { colors } from 'src/styles';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.almostBlack};
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px;
  padding: 1rem;
  box-sizing: border-box;
`;