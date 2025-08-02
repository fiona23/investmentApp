import React from 'react';
import { render, screen } from '@testing-library/react-native';
import InvestmentSummary from '../InvestmentSummary';

// Mock the constants
jest.mock('../../utils/constants', () => ({
  FUND_DATA: [
    {
      id: 'test-fund',
      name: 'Test Fund',
      category: 'Equities',
      riskLevel: 'Medium Risk',
      description: 'A test fund for testing purposes',
      performance: 5.5,
    },
  ],
}));

describe('InvestmentSummary', () => {
  const defaultProps = {
    fundId: 'test-fund',
    amount: 1000,
    isaRemaining: 20000,
  };

  it('renders investment summary title', () => {
    render(<InvestmentSummary {...defaultProps} />);
    expect(screen.getByText('Investment Summary')).toBeTruthy();
  });

  it('displays fund information correctly', () => {
    render(<InvestmentSummary {...defaultProps} />);
    expect(screen.getByText('Fund Details')).toBeTruthy();
    expect(screen.getByText('Test Fund')).toBeTruthy();
    expect(screen.getByText('Equities')).toBeTruthy();
    expect(screen.getByText('Medium Risk')).toBeTruthy();
  });

  it('displays investment details correctly', () => {
    render(<InvestmentSummary {...defaultProps} />);
    expect(screen.getByText('Investment Details')).toBeTruthy();
    expect(screen.getByText('Amount:')).toBeTruthy();
    expect(screen.getByText('£1,000')).toBeTruthy();
    expect(screen.getByText('ISA Annual Limit:')).toBeTruthy();
    expect(screen.getByText('£20,000')).toBeTruthy();
  });

  it('shows warnings when amount exceeds limit', () => {
    render(<InvestmentSummary {...defaultProps} amount={25000} />);
    expect(screen.getByText('Warnings')).toBeTruthy();
    expect(screen.getByText('• Amount exceeds ISA annual limit')).toBeTruthy();
  });

  it('shows over limit notice when amount exceeds ISA remaining', () => {
    render(
      <InvestmentSummary
        {...defaultProps}
        amount={25000}
        isaRemaining={10000}
      />
    );
    expect(screen.getByText('Over ISA Limit')).toBeTruthy();
    expect(
      screen.getByText(/This investment will exceed your ISA annual limit/)
    ).toBeTruthy();
  });

  it('shows error when fund is not found', () => {
    render(<InvestmentSummary {...defaultProps} fundId="non-existent-fund" />);
    expect(screen.getByText('Fund not found')).toBeTruthy();
  });
});
