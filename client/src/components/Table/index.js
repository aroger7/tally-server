import styled from '@emotion/styled';
import { colors, util } from 'src/styles';

export const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
`;

export const TableHeader = styled.thead``;
export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 3px solid rgba(${util.hexToRgbString(colors.almostWhite)}, 0.3);
`;

export const TableHeaderCell = styled.th`
  color: ${colors.cornflowerBlue};
  font-weight: 600;
  padding: 1rem;
  min-width: 0;
  text-align: left;
`;

export const TableBodyCell = styled.td`
  color: ${colors.almostWhite};
  font-weight: 400;
  padding: 1rem;
  min-width: 0;
`;
