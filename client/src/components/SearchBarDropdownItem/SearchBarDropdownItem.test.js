import { render, screen } from '@testing-library/react';
import React from 'react';
import SearchBarDropdownItem from './SearchBarDropdownItem';

describe('SearchBarDropdownItem', () => {
  const id = 730;
  const name = "Counter-Strike: Global Offensive";

  it('should render a name and image', () => {
    render(<SearchBarDropdownItem id={id} name={name}/>);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
