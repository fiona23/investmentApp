import React from 'react';
import { render, screen } from '../../test/test-utils';
import AccountScreen from '../AccountScreen';

describe('AccountScreen', () => {
  it('renders account screen title', () => {
    render(<AccountScreen />);
    expect(screen.getByText('My Account')).toBeTruthy();
  });

  it('renders investment summary', () => {
    render(<AccountScreen />);
    expect(screen.getByText('Portfolio Overview')).toBeTruthy();
    expect(screen.getByText('Total Invested:')).toBeTruthy();
    // Check that £25,000 appears at least once
    expect(screen.getAllByText('£25,000').length).toBeGreaterThan(0);
  });

  it('renders recent investments', () => {
    render(<AccountScreen />);
    expect(screen.getByText('Recent Investments')).toBeTruthy();
    expect(screen.getByText('Cushon Equities Fund')).toBeTruthy();
  });
});
