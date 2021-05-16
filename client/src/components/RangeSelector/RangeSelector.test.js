import { render } from '@testing-library/react';
import React from 'react';
import RangeSelector from './RangeSelector';

describe('RangeSelector', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<RangeSelector {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('RangeSelector')).toBeTruthy();
    });
});
