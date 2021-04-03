import styled from '@emotion/styled';
import { colors } from 'src/styles';

export const SearchDropdownList = styled.ul`
  background-color: ${colors.almostWhite};
  /* display: ${({ isOpen }) => isOpen ? 'block' : 'none'}; */
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const NoResultsItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 240px;
`;