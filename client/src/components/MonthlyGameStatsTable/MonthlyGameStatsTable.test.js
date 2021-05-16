import { render } from '@testing-library/react';
import React from 'react';
import MonthlyGameStatsTable from './MonthlyGameStatsTable';

describe('MonthlyGameStatsTable', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<MonthlyGameStatsTable {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('MonthlyGameStatsTable')).toBeTruthy();
    });
});
