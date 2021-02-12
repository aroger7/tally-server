import { render } from '@testing-library/react';
import React from 'react';
import SimpleTable from './SimpleTable';

describe('SimpleTable', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<SimpleTable {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('SimpleTable')).toBeTruthy();
    });
});
