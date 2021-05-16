import { render } from '@testing-library/react';
import React from 'react';
import RangeSelectorRangeButton from './RangeSelectorRangeButton';

describe('RangeSelectorRangeButton', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<RangeSelectorRangeButton {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('RangeSelectorRangeButton')).toBeTruthy();
    });
});
