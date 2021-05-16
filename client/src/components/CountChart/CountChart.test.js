import { render } from '@testing-library/react';
import React from 'react';
import CountChart from './CountChart';

describe('CountChart', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<CountChart {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('CountChart')).toBeTruthy();
    });
});
