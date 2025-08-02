import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import AccountScreen from '../AccountScreen';
import { useInvestmentStore } from '../../store/investmentStore';

// Mock the Zustand store
jest.mock('../../store/investmentStore');

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
  const mockLoadInvestmentSummary = jest.fn();
  const mockLoadInvestments = jest.fn();

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Default mock implementation for empty state
    (useInvestmentStore as unknown as jest.Mock).mockReturnValue({
      investmentSummary: {
        totalInvested: 0,
        investmentCount: 0,
        currentYearTotal: 0,
        remainingISALimit: 20000,
        averageReturn: 0,
      },
      investments: [],
      isLoading: false,
      error: null,
      loadInvestmentSummary: mockLoadInvestmentSummary,
      loadInvestments: mockLoadInvestments,
    });
  });

  it('renders empty state when no investments', async () => {
    render(<AccountScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('No investments yet')).toBeTruthy();
    expect(
      screen.getByText(
        /Start your investment journey by exploring our range of funds/i
      )
    ).toBeTruthy();
  });

  it('renders investment summary when user has investments', async () => {
    // Mock data for user with investments
    (useInvestmentStore as unknown as jest.Mock).mockReturnValue({
      investmentSummary: {
        totalInvested: 25000,
        investmentCount: 3,
        currentYearTotal: 25000,
        remainingISALimit: 0,
        averageReturn: 6.8,
      },
      investments: [
        {
          id: '1',
          fundId: 'equities-fund',
          fundName: 'Cushon Equities Fund',
          amount: 25000,
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
          status: 'confirmed',
        },
      ],
      isLoading: false,
      error: null,
      loadInvestmentSummary: mockLoadInvestmentSummary,
      loadInvestments: mockLoadInvestments,
    });

    render(<AccountScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Investment Summary')).toBeTruthy();
    expect(screen.getByText('Total Invested')).toBeTruthy();
    expect(screen.getByText('Recent Transactions')).toBeTruthy();
    expect(screen.getByText('Cushon Equities Fund')).toBeTruthy();
  });

  it('renders loading state', async () => {
    (useInvestmentStore as unknown as jest.Mock).mockReturnValue({
      investmentSummary: {
        totalInvested: 0,
        investmentCount: 0,
        currentYearTotal: 0,
        remainingISALimit: 20000,
        averageReturn: 0,
      },
      investments: [],
      isLoading: true,
      error: null,
      loadInvestmentSummary: mockLoadInvestmentSummary,
      loadInvestments: mockLoadInvestments,
    });

    render(<AccountScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Loading my account...')).toBeTruthy();
  });

  it('renders error state', async () => {
    (useInvestmentStore as unknown as jest.Mock).mockReturnValue({
      investmentSummary: {
        totalInvested: 0,
        investmentCount: 0,
        currentYearTotal: 0,
        remainingISALimit: 20000,
        averageReturn: 0,
      },
      investments: [],
      isLoading: false,
      error: 'Failed to load investments',
      loadInvestmentSummary: mockLoadInvestmentSummary,
      loadInvestments: mockLoadInvestments,
    });

    render(<AccountScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Failed to load account')).toBeTruthy();
    expect(screen.getByText('Failed to load investments')).toBeTruthy();
  });
});
