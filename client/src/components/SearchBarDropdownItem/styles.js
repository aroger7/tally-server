import styled from '@emotion/styled';
import { colors } from 'src/styles';

export const SearchDropdownItem = styled.li`
  width: 100%;
`;

export const SearchDropdownItemLink = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;

  &:visited, &:link, &:active {
    color: ${colors.black};
  }

  &:hover, &:focus {
    background-color: ${colors.cornflowerBlue};
    outline: none;
  }
`;

export const SearchDropdownItemImage = styled.img`
  height: 3rem;
`;

export const SearchDropdownItemText = styled.p`
  font-size: 1rem;
  margin: 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;