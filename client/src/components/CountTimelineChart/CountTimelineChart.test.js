import { render } from '@testing-library/react';
import React from 'react';
import CountTimelineChart from './CountTimelineChart';

describe('CountTimelineChart', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<CountTimelineChart {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('CountTimelineChart')).toBeTruthy();
    });
});
