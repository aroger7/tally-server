import { render } from '@testing-library/react';
import React from 'react';
import GainCell from './GainCell';

describe('GainCell', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<GainCell {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('GainCell')).toBeTruthy();
    });
});
