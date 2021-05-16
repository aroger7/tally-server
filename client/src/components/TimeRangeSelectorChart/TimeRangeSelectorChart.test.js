import { render } from '@testing-library/react';
import React from 'react';
import TimeRangeSelectorChart from './TimeRangeSelectorChart';

describe('TimeRangeSelectorChart', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<TimeRangeSelectorChart {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('TimeRangeSelectorChart')).toBeTruthy();
    });
});
