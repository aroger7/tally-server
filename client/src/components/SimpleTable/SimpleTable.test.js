import { render, screen, within, waitFor } from '@testing-library/react';
import React from 'react';
import SimpleTable from './SimpleTable';


describe('SimpleTable', () => {
  const columns = [
    { Header: 'Column 1', id: 'col1', accessor: 'col1' },
    { Header: 'Column 2', id: 'col2', accessor: 'col2' }
  ];
  const data = [
    { col1: 'Row 1 Col 1', col2: 'Row 1 Col 2' },
    { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2' }
  ];

  const defaultProps = { columns, data };

  it('should render', () => {
    const { asFragment } = render(<SimpleTable {...defaultProps} />);

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should display headers with expected values', () => {
    render(<SimpleTable {...defaultProps} />);

    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(columns.length);

    columnHeaders.forEach((columnHeader, index) => {
      expect(columnHeader).toHaveTextContent(columns[index].Header)
    });
  });

  it('should display rows of data with expected values', () => {
    render(<SimpleTable {...defaultProps} />);

    // Slice off the top header row
    const rows = screen.getAllByRole('row').slice(1);
    expect(rows).toHaveLength(data.length);

    rows.forEach((row, index) => {
      const dataRow = data[index];
      const cells = within(row).getAllByRole('cell');
      expect(cells).toHaveLength(2);
      expect(cells[0]).toHaveTextContent(dataRow.col1);
      expect(cells[1]).toHaveTextContent(dataRow.col2);
    });
  });
});
