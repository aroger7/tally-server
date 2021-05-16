import { render } from '@testing-library/react';
import React from 'react';
import IndividualGameStats from './IndividualGameStats';

describe('IndividualGameStats', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<IndividualGameStats {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('IndividualGameStats')).toBeTruthy();
    });
});
