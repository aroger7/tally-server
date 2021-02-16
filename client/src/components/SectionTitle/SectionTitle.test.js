import { render, screen } from '@testing-library/react';
import React from 'react';
import SectionTitle from './SectionTitle';

describe('SectionTitle', () => {
  it('should render text', () => {
    const title = 'Section Title';
    render(<SectionTitle>{title}</SectionTitle>);

    expect(screen.getByRole('heading', { name: new RegExp(title, 'i') })).toBeInTheDocument();
  })
});
