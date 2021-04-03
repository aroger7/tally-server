import styled from '@emotion/styled'
import { colors } from 'src/styles';

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${colors.almostWhite};
  border-radius: 10px;
  width: 25rem;
  height: 3rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
  border: 3px solid transparent;

  &:hover, &:focus-within {
    border-color: ${colors.cornflowerBlue};
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  background: none;
  border: none;

  &:focus {
    border: none;
    outline: none;
  }
`;

export const SearchDropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
`;

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