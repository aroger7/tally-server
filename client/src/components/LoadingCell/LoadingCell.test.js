import { render, screen } from '@testing-library/react';
import React from 'react';
import LoadingCell from './LoadingCell';

describe('LoadingCell', () => {
    const value = 'test';
    const defaultProps = { value };

    it('should render a value', () => {
        const { asFragment } = render(<LoadingCell {...defaultProps} />)

        expect(asFragment()).toMatchSnapshot();
        expect(screen.getByText(value)).toBeInTheDocument();
    })

    it('should render a loading image', () => {
        render(<LoadingCell {...defaultProps} isLoading />);

        expect(screen.getByRole('img')).toBeInTheDocument();
    });
});
