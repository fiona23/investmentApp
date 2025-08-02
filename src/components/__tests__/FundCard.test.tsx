import React from 'react';
import { render, fireEvent } from '../../test/test-utils';
import FundCard from '../FundCard';
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

describe('FundCard', () => {
  it('renders fund information correctly', () => {
    const { getByText } = render(<FundCard fund={mockFund} />);

    expect(getByText('Test Fund')).toBeTruthy();
    expect(getByText('A test fund for testing purposes')).toBeTruthy();
    expect(getByText('Medium Risk')).toBeTruthy();
    expect(getByText('5.5%')).toBeTruthy();
    expect(getByText('Equities')).toBeTruthy();
    expect(getByText('£100')).toBeTruthy();
    expect(getByText('£20,000')).toBeTruthy();
  });

  it('calls onSelect when card is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <FundCard fund={mockFund} onSelect={onSelect} />
    );

    fireEvent.press(getByText('Test Fund'));
    expect(onSelect).toHaveBeenCalledWith(mockFund);
  });

  it('calls onPress when card is pressed without onSelect', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <FundCard fund={mockFund} onPress={onPress} />
    );

    fireEvent.press(getByText('Test Fund'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows selection indicator when isSelected is true', () => {
    const { getByTestId } = render(
      <FundCard fund={mockFund} isSelected={true} />
    );

    expect(getByTestId('check-circle')).toBeTruthy();
  });

  it('does not show selection indicator when isSelected is false', () => {
    const { queryByTestId } = render(
      <FundCard fund={mockFund} isSelected={false} />
    );

    expect(queryByTestId('check-circle')).toBeNull();
  });
});
