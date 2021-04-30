import styled from '@emotion/styled';
import { colors } from 'src/styles';

export const App = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 4rem 1fr;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.primary};
`;

export const HeaderContainer = styled.div`
  grid-column: 1;
  grid-row: 1;
`;

export const Body = styled.div`
  grid-column: 1;
  grid-row: 2;
  overflow-y: auto;
`;