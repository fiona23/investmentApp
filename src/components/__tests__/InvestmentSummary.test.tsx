import React from 'react';
import { render } from '../../test/test-utils';
import InvestmentSummary from '../InvestmentSummary';
import { Fund } from '../../types/fund';

const mockFund: Fund = {
  id: 'test-fund',
  name: 'Test Fund',
  description: 'A test fund for testing purposes',
  category: 'Equities',
  riskLevel: 'Medium',
  performance: 5.5,
  minInvestment: 100,
  maxInvestment: 20000,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('InvestmentSummary', () => {
  it('renders investment summary title', () => {
    const { getByText } = render(
      <InvestmentSummary fund={mockFund} amount={1000} />
    );

    expect(getByText('Investment Summary')).toBeTruthy();
  });

  it('displays fund information correctly', () => {
    const { getByText } = render(
      <InvestmentSummary fund={mockFund} amount={1000} />
    );

    expect(getByText('Fund Details')).toBeTruthy();
    expect(getByText('Test Fund')).toBeTruthy();
    expect(getByText('Medium Risk')).toBeTruthy();
    expect(getByText('A test fund for testing purposes')).toBeTruthy();
  });

  it('displays investment details correctly', () => {
    const { getByText } = render(
      <InvestmentSummary fund={mockFund} amount={1000} />
    );

    expect(getByText('Investment Details')).toBeTruthy();
    expect(getByText('Amount:')).toBeTruthy();
    expect(getByText('£1,000')).toBeTruthy();
    expect(getByText('Fund Category:')).toBeTruthy();
    expect(getByText('Equities')).toBeTruthy();
    expect(getByText('Annual Return:')).toBeTruthy();
    expect(getByText('5.5%')).toBeTruthy();
  });

  it('displays ISA information correctly', () => {
    const { getByText } = render(
      <InvestmentSummary fund={mockFund} amount={1000} />
    );

    expect(getByText('ISA Information')).toBeTruthy();
    expect(getByText('Annual Limit:')).toBeTruthy();
    expect(getByText('£20,000')).toBeTruthy();
    expect(getByText('Remaining:')).toBeTruthy();
    expect(getByText('£19,000')).toBeTruthy();
  });

  it('shows warnings when provided', () => {
    const warnings = ['Warning 1', 'Warning 2'];
    const { getByText } = render(
      <InvestmentSummary fund={mockFund} amount={1000} warnings={warnings} />
    );

    expect(getByText('Warnings')).toBeTruthy();
    expect(getByText('• Warning 1')).toBeTruthy();
    expect(getByText('• Warning 2')).toBeTruthy();
  });

  it('shows over limit warning when amount exceeds ISA limit', () => {
    const { getByText } = render(
      <InvestmentSummary fund={mockFund} amount={25000} />
    );

    expect(getByText('Important Notice')).toBeTruthy();
    expect(
      getByText(/This investment exceeds the ISA annual limit/)
    ).toBeTruthy();
  });
});
