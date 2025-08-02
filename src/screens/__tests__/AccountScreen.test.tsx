import React from 'react';
import { render, screen } from '@testing-library/react-native';
import AccountScreen from '../AccountScreen';
import {
  useInvestmentSummary,
  useInvestments,
  useHasInvestments,
} from '../../services/investmentService';

// Mock the investment service hooks
jest.mock('../../services/investmentService', () => ({
  useInvestmentSummary: jest.fn(),
  useInvestments: jest.fn(),
  useHasInvestments: jest.fn(),
}));

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock safe area insets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
}));

describe('AccountScreen', () => {
  beforeEach(() => {
    // Default mock implementation for empty state
    (useInvestmentSummary as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    (useInvestments as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    (useHasInvestments as jest.Mock).mockReturnValue({
      hasInvestments: false,
      isLoading: false,
      error: null,
    });
  });

  it('renders empty state when no investments', () => {
    render(<AccountScreen />);
    expect(screen.getByText('Start your investment journey')).toBeTruthy();
    expect(
      screen.getByText(/You haven't made any investments yet/i)
    ).toBeTruthy();
  });

  it('renders investment summary when user has investments', () => {
    // Mock data for user with investments
    (useInvestmentSummary as jest.Mock).mockReturnValue({
      data: {
        totalInvested: 25000,
        investmentCount: 3,
        currentYearTotal: 25000,
        remainingISALimit: 0,
        averageReturn: 6.8,
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    (useInvestments as jest.Mock).mockReturnValue({
      data: [
        {
          id: '1',
          fundId: 'equities-fund',
          fundName: 'Cushon Equities Fund',
          amount: 25000,
          date: new Date('2024-01-15'),
          status: 'confirmed',
        },
      ],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    (useHasInvestments as jest.Mock).mockReturnValue({
      hasInvestments: true,
      isLoading: false,
      error: null,
    });

    render(<AccountScreen />);
    expect(screen.getByText('Portfolio Overview')).toBeTruthy();
    expect(screen.getByText('Total Invested:')).toBeTruthy();
    expect(screen.getByText('Recent Investments')).toBeTruthy();
    expect(screen.getByText('Cushon Equities Fund')).toBeTruthy();
  });

  it('renders loading state', () => {
    (useInvestmentSummary as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<AccountScreen />);
    expect(screen.getByText('Loading your investments...')).toBeTruthy();
  });

  it('renders error state', () => {
    (useInvestmentSummary as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to load'),
      refetch: jest.fn(),
    });

    render(<AccountScreen />);
    expect(screen.getByText('Failed to load investments')).toBeTruthy();
    expect(
      screen.getByText(/We couldn't load your investment data/i)
    ).toBeTruthy();
  });
});
