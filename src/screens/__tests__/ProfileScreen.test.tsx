import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import ProfileScreen from '../ProfileScreen';
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

describe('ProfileScreen', () => {
  const mockLoadInvestmentSummary = jest.fn();

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Default mock implementation
    (useInvestmentStore as unknown as jest.Mock).mockReturnValue({
      investmentSummary: {
        totalInvested: 15000,
        investmentCount: 2,
        currentYearTotal: 15000,
        remainingISALimit: 5000,
        averageReturn: 5.2,
      },
      isLoading: false,
      error: null,
      loadInvestmentSummary: mockLoadInvestmentSummary,
    });
  });

  it('renders profile screen title', async () => {
    render(<ProfileScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Profile')).toBeTruthy();
  });

  it('renders user information', async () => {
    render(<ProfileScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('john.doe@example.com')).toBeTruthy();
  });

  it('renders ISA information', async () => {
    render(<ProfileScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('ISA Information')).toBeTruthy();
    expect(screen.getByText('ISA Number:')).toBeTruthy();
    expect(screen.getByText('ISA-2024-001')).toBeTruthy();
  });

  it('renders settings menu', async () => {
    render(<ProfileScreen />);

    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Settings')).toBeTruthy();
    expect(screen.getByText('Edit Profile')).toBeTruthy();
    expect(screen.getByText('Contact Support')).toBeTruthy();
  });
});
