import React from 'react';
import { render } from '@testing-library/react-native';
import AmountInput from '../AmountInput';

describe('AmountInput', () => {
  const mockOnChangeText = jest.fn();

  it('renders correctly with default props', () => {
    const { getByText } = render(
      <AmountInput value="" onChangeText={mockOnChangeText} />
    );

    expect(getByText('ISA Annual Limit: £20,000')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const { getByText } = render(
      <AmountInput
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Custom placeholder"
      />
    );

    expect(getByText('ISA Annual Limit: £20,000')).toBeTruthy();
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <AmountInput
        value=""
        onChangeText={mockOnChangeText}
        error="Invalid amount"
      />
    );

    expect(getByText('Invalid amount')).toBeTruthy();
  });

  it('displays max amount when provided', () => {
    const { getByText } = render(
      <AmountInput value="" onChangeText={mockOnChangeText} maxAmount={20000} />
    );

    expect(getByText('Max Investment: £20,000')).toBeTruthy();
  });

  it('displays ISA limit when max amount is not provided', () => {
    const { getByText } = render(
      <AmountInput value="" onChangeText={mockOnChangeText} />
    );

    expect(getByText('ISA Annual Limit: £20,000')).toBeTruthy();
  });
});
