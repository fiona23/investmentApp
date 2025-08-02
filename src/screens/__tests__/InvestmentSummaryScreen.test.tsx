import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import InvestmentSummaryScreen from '../InvestmentSummaryScreen';
import { useInvestmentStore } from '../../store/investmentStore';
import { useFunds } from '../../services/investmentService';

// Mock the Zustand store
jest.mock('../../store/investmentStore');

// Mock the investment service
jest.mock('../../services/investmentService');

// Mock navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {
      fundId: 'test-fund',
      amount: 1000,
    },
  }),
}));

// Mock safe area insets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
}));

describe('InvestmentSummaryScreen', () => {
  const mockAddInvestment = jest.fn();
  const mockFunds = [
    {
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
    },
  ];

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock the Zustand store
    (useInvestmentStore as unknown as jest.Mock).mockReturnValue({
      addInvestment: mockAddInvestment,
      isLoading: false,
      error: null,
      investmentSummary: {
        totalInvested: 0,
        investmentCount: 0,
        currentYearTotal: 0,
        remainingISALimit: 20000,
        averageReturn: 0,
      },
    });

    // Mock the funds service
    (useFunds as jest.Mock).mockReturnValue({
      data: mockFunds,
      isLoading: false,
      error: null,
    });
  });

  it('renders investment summary screen', async () => {
    render(<InvestmentSummaryScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Confirm Investment')).toBeTruthy();
    expect(screen.getByText('Review your investment details')).toBeTruthy();
    expect(screen.getByText('Confirm Investment')).toBeTruthy();
  });

  it('shows loading state when creating investment', async () => {
    (useInvestmentStore as unknown as jest.Mock).mockReturnValue({
      addInvestment: mockAddInvestment,
      isLoading: true,
      error: null,
      investmentSummary: {
        totalInvested: 0,
        investmentCount: 0,
        currentYearTotal: 0,
        remainingISALimit: 20000,
        averageReturn: 0,
      },
    });

    render(<InvestmentSummaryScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Creating your investment...')).toBeTruthy();
  });

  it('shows error state when investment creation fails', async () => {
    (useInvestmentStore as unknown as jest.Mock).mockReturnValue({
      addInvestment: mockAddInvestment,
      isLoading: false,
      error: 'Failed to create investment',
      investmentSummary: {
        totalInvested: 0,
        investmentCount: 0,
        currentYearTotal: 0,
        remainingISALimit: 20000,
        averageReturn: 0,
      },
    });

    render(<InvestmentSummaryScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Use getAllByText and check if it exists
    const errorElements = screen.getAllByText('Failed to create investment');
    expect(errorElements.length).toBeGreaterThan(0);
  });
});
