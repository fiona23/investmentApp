import React from 'react';
import { render, screen } from '@testing-library/react-native';
import InvestmentSummary from '../InvestmentSummary';
import * as investmentService from '../../services/investmentService';

// Mock the investment service
jest.mock('../../services/investmentService');

describe('InvestmentSummary', () => {
  const defaultProps = {
    fundId: 'test-fund',
    amount: 1000,
    isaRemaining: 15000,
  };

  const mockFund = {
    id: 'test-fund',
    name: 'Test Fund',
    category: 'Equities',
    riskLevel: 'Medium',
    fundSize: 1000000,
    minInvestment: 100,
    description: 'A test fund for testing purposes',
    performance: {
      oneYear: 5.5,
      threeYear: 12.3,
      fiveYear: 15.7,
      sinceInception: 18.2,
    },
    portfolio: {
      ukEquities: 40,
      globalEquities: 35,
      bonds: 15,
      cash: 10,
    },
  };

  beforeEach(() => {
    // Mock the useFunds hook
    (investmentService.useFunds as jest.Mock).mockReturnValue({
      data: [mockFund],
      isLoading: false,
      error: null,
    });
  });

  it('renders investment summary title', () => {
    render(<InvestmentSummary {...defaultProps} />);
    expect(screen.getByText('Investment Summary')).toBeTruthy();
  });

  it('displays fund information correctly', () => {
    render(<InvestmentSummary {...defaultProps} />);
    expect(screen.getByText('Fund Details')).toBeTruthy();
    expect(screen.getByText('Test Fund')).toBeTruthy();
    expect(screen.getByText('Equities')).toBeTruthy();
    expect(screen.getByText('Medium')).toBeTruthy();
  });

  it('displays investment details correctly', () => {
    render(<InvestmentSummary {...defaultProps} />);
    expect(screen.getByText('Investment Details')).toBeTruthy();
    expect(screen.getByText('Amount:')).toBeTruthy();
    expect(screen.getByText('£1,000.00')).toBeTruthy();
    expect(screen.getByText('ISA Annual Limit:')).toBeTruthy();
    expect(screen.getByText('£15,000.00')).toBeTruthy();
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
        amount={20000}
        isaRemaining={15000}
      />
    );
    expect(screen.getByText('Over ISA Limit')).toBeTruthy();
    expect(
      screen.getByText(/This investment will exceed your ISA annual limit/)
    ).toBeTruthy();
  });
});
