import { render } from '@testing-library/react';
import React from 'react';
import SingleMetricCard from './SingleMetricCard';

describe('SingleMetricCard', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<SingleMetricCard {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('SingleMetricCard')).toBeTruthy();
    });
});
