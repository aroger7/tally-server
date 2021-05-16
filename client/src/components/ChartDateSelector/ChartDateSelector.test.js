import { render } from '@testing-library/react';
import React from 'react';
import ChartDateSelector from './ChartDateSelector';

describe('ChartDateSelector', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<ChartDateSelector {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('ChartDateSelector')).toBeTruthy();
    });
});
