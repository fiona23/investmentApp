import AsyncStorage from '@react-native-async-storage/async-storage';
import { Investment, InvestmentSummary } from '../types/investment';

// Storage keys
const STORAGE_KEYS = {
  INVESTMENTS: 'investments',
  INVESTMENT_SUMMARY: 'investment_summary',
} as const;

// Investment storage functions
export const getInvestments = async (): Promise<Investment[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.INVESTMENTS);
    if (!data) return [];

    const investments = JSON.parse(data);

    // Ensure dates are properly deserialized
    return investments.map(
      (investment: {
        createdAt: string;
        updatedAt: string;
        [key: string]: unknown;
      }) => ({
        ...investment,
        createdAt: new Date(investment.createdAt),
        updatedAt: new Date(investment.updatedAt),
      })
    );
  } catch (error) {
    console.error('Error loading investments:', error);
    return [];
  }
};

export const saveInvestments = async (
  investments: Investment[]
): Promise<void> => {
  try {
    // Ensure dates are properly serialized
    const serializedInvestments = investments.map(investment => ({
      ...investment,
      createdAt:
        investment.createdAt instanceof Date
          ? investment.createdAt.toISOString()
          : investment.createdAt,
      updatedAt:
        investment.updatedAt instanceof Date
          ? investment.updatedAt.toISOString()
          : investment.updatedAt,
    }));

    await AsyncStorage.setItem(
      STORAGE_KEYS.INVESTMENTS,
      JSON.stringify(serializedInvestments)
    );
  } catch (error) {
    console.error('Error saving investments:', error);
  }
};

export const addInvestment = async (investment: Investment): Promise<void> => {
  try {
    const investments = await getInvestments();
    investments.push(investment);
    await saveInvestments(investments);
  } catch (error) {
    console.error('Error adding investment:', error);
  }
};

export const updateInvestment = async (
  investmentId: string,
  updates: Partial<Investment>
): Promise<void> => {
  try {
    const investments = await getInvestments();
    const index = investments.findIndex(inv => inv.id === investmentId);
    if (index !== -1) {
      investments[index] = { ...investments[index], ...updates };
      await saveInvestments(investments);
    }
  } catch (error) {
    console.error('Error updating investment:', error);
  }
};

// Investment summary storage functions
export const getInvestmentSummary = async (): Promise<InvestmentSummary> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.INVESTMENT_SUMMARY);
    return data
      ? JSON.parse(data)
      : {
          totalInvested: 0,
          investmentCount: 0,
          currentYearTotal: 0,
          remainingISALimit: 20000,
          averageReturn: 0,
        };
  } catch (error) {
    console.error('Error loading investment summary:', error);
    return {
      totalInvested: 0,
      investmentCount: 0,
      currentYearTotal: 0,
      remainingISALimit: 20000,
      averageReturn: 0,
    };
  }
};

export const saveInvestmentSummary = async (
  summary: InvestmentSummary
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.INVESTMENT_SUMMARY,
      JSON.stringify(summary)
    );
  } catch (error) {
    console.error('Error saving investment summary:', error);
  }
};

export const updateInvestmentSummary = async (): Promise<void> => {
  try {
    const investments = await getInvestments();
    const currentYear = new Date().getFullYear();

    const currentYearInvestments = investments.filter(
      inv => new Date(inv.createdAt).getFullYear() === currentYear
    );

    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    const currentYearTotal = currentYearInvestments.reduce(
      (sum, inv) => sum + inv.amount,
      0
    );

    const summary: InvestmentSummary = {
      totalInvested,
      investmentCount: investments.length,
      currentYearTotal,
      remainingISALimit: Math.max(0, 20000 - currentYearTotal),
      averageReturn: 0, // This would be calculated from actual returns
    };

    // Debug logging
    console.log('Investment Summary Calculation:', {
      currentYear,
      currentYearInvestments: currentYearInvestments.length,
      currentYearTotal,
      remainingISALimit: summary.remainingISALimit,
      totalInvestments: investments.length,
    });

    await saveInvestmentSummary(summary);
  } catch (error) {
    console.error('Error updating investment summary:', error);
  }
};

export const resetISAAllowance = async (): Promise<void> => {
  try {
    // Clear all investments
    await saveInvestments([]);

    // Reset investment summary to full allowance
    const summary: InvestmentSummary = {
      totalInvested: 0,
      investmentCount: 0,
      currentYearTotal: 0,
      remainingISALimit: 20000,
      averageReturn: 0,
    };

    await saveInvestmentSummary(summary);
    console.log('ISA allowance reset to £20,000');
  } catch (error) {
    console.error('Error resetting ISA allowance:', error);
  }
};
