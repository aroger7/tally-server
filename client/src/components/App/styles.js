import styled from '@emotion/styled';
import { colors } from 'src/styles';

export const App = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.primary};
`;

export const HeaderContainer = styled.div`
  flex: 0 0 4rem;
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
`;