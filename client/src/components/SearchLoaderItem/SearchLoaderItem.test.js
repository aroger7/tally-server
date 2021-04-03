import { render, screen } from '@testing-library/react';
import React from 'react';
import SearchLoaderItem from './SearchLoaderItem';

describe('SearchLoaderItem', () => {
  it('should contain a loading svg', () => {
    render(<SearchLoaderItem />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
