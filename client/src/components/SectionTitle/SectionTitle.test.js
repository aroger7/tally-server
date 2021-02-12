import { render } from '@testing-library/react';
import React from 'react';
import SectionTitle from './SectionTitle';

describe('SectionTitle', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<SectionTitle {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('SectionTitle')).toBeTruthy();
    });
});
