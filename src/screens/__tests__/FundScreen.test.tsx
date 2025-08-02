import React from 'react';
import { render, screen } from '../../test/test-utils';
import FundScreen from '../FundScreen';

describe('FundScreen', () => {
  it('renders funds screen title', () => {
    render(<FundScreen />);
    expect(screen.getByText('Investment Funds')).toBeTruthy();
  });
});
