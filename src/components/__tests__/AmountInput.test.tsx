import React from 'react';
import { render } from '../../test/test-utils';
import AmountInput from '../AmountInput';
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

describe('AmountInput', () => {
  it('renders amount input with currency symbol', () => {
    const { getByText } = render(
      <AmountInput fund={mockFund} value={0} onChange={() => {}} />
    );

    // The component shows the currency symbol
    expect(getByText('£')).toBeTruthy();
  });

  it('shows validation error for invalid amount', () => {
    const { getByText } = render(
      <AmountInput fund={mockFund} value={50} onChange={() => {}} />
    );

    expect(getByText('Minimum investment is £100')).toBeTruthy();
  });

  it('shows quick amounts label', () => {
    const { getByText } = render(
      <AmountInput fund={mockFund} value={0} onChange={() => {}} />
    );

    expect(getByText('Quick amounts:')).toBeTruthy();
  });
});
