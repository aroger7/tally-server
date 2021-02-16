import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';

import * as Table from 'src/components/Table';

const SimpleTable = ({ columns, data, isLoading, numLoadingRows }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: data || Array.from({ length: numLoadingRows }, () => ({})),
    isLoading
  });

  return (
    <Table.Table {...getTableProps()}>
      <Table.TableHeader>
        {headerGroups.map(headerGroup => (
          <Table.TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => {
              const width = column.width;
              const style = (Boolean(width) || width >= 0) && index < headerGroup.headers.length - 1
                ? { width, maxWidth: width }
                : {};
              return (
                <Table.TableHeaderCell {...column.getHeaderProps()} style={style}>
                  {column.render('Header')}
                </Table.TableHeaderCell>
              );
            })}
          </Table.TableRow>
        ))}
      </Table.TableHeader>
      <Table.TableBody {...getTableBodyProps()}>
        {
          rows.map((row) => {
            prepareRow(row);
            return (
              <Table.TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Table.TableBodyCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Table.TableBodyCell>
                ))}
              </Table.TableRow>
            )
          })
        }
        
      </Table.TableBody>
    </Table.Table>
  )
};

SimpleTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  numLoadingRows: PropTypes.number
};

SimpleTable.defaultProps = {
  columns: [],
  isLoading: false,
  numLoadingRows: 10
};

export default SimpleTable;
