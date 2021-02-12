import { render } from '@testing-library/react';
import React from 'react';
import LoadingCell from './LoadingCell';

describe('LoadingCell', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<LoadingCell {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('LoadingCell')).toBeTruthy();
    });
});
