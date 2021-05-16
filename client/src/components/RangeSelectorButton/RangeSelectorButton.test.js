import { render } from '@testing-library/react';
import React from 'react';
import RangeSelectorButton from './RangeSelectorButton';

describe('RangeSelectorButton', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<RangeSelectorButton {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('RangeSelectorButton')).toBeTruthy();
    });
});
