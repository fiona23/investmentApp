import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import FundScreen from '../FundScreen';
import * as investmentService from '../../services/investmentService';

// Mock the investment service
jest.mock('../../services/investmentService');

describe('FundScreen', () => {
  beforeEach(() => {
    // Mock the useFunds hook
    (investmentService.useFunds as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
  });

  it('renders funds screen title', () => {
    render(
      <NavigationContainer>
        <FundScreen />
      </NavigationContainer>
    );
    expect(screen.getByText('Available Funds')).toBeTruthy();
  });
});
