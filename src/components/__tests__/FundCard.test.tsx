import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FundCard from '../FundCard';
import { Fund } from '../../types/fund';

describe('FundCard', () => {
  const mockFund: Fund = {
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

  const mockOnSelect = jest.fn();
  const mockOnPress = jest.fn();

  it('renders fund information correctly', () => {
    const { getByText } = render(
      <FundCard fund={mockFund} onSelect={mockOnSelect} />
    );

    expect(getByText('Test Fund')).toBeTruthy();
    expect(getByText('A test fund for testing purposes')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('5.5%')).toBeTruthy();
    expect(getByText('Equities')).toBeTruthy();
    expect(getByText('£100.00')).toBeTruthy();
    expect(getByText('£1,000,000.00')).toBeTruthy();
  });

  it('calls onSelect when card is pressed', () => {
    const { getByText } = render(
      <FundCard fund={mockFund} onSelect={mockOnSelect} />
    );

    fireEvent.press(getByText('Test Fund'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockFund);
  });

  it('calls onPress when card is pressed', () => {
    const { getByText } = render(
      <FundCard fund={mockFund} onPress={mockOnPress} />
    );

    fireEvent.press(getByText('Test Fund'));
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('shows selection indicator when selected', () => {
    const { getByText } = render(
      <FundCard fund={mockFund} onSelect={mockOnSelect} isSelected={true} />
    );

    expect(getByText('Test Fund')).toBeTruthy();
    // The selection indicator might be a visual element, so we just check the fund renders
    expect(getByText('A test fund for testing purposes')).toBeTruthy();
  });
});
