import { create } from 'zustand';
import { Investment, InvestmentSummary } from '../types/investment';
import {
  getInvestments,
  addInvestment as addInvestmentToStorage,
  updateInvestment as updateInvestmentInStorage,
  getInvestmentSummary,
  updateInvestmentSummary as updateSummaryInStorage,
} from '../services/storageService';

interface InvestmentState {
  investments: Investment[];
  investmentSummary: InvestmentSummary;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadInvestments: () => Promise<void>;
  addInvestment: (
    investment: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  updateInvestment: (
    investmentId: string,
    updates: Partial<Investment>
  ) => Promise<void>;
  loadInvestmentSummary: () => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  investments: [],
  investmentSummary: {
    totalInvested: 0,
    investmentCount: 0,
    currentYearTotal: 0,
    remainingISALimit: 20000,
    averageReturn: 0,
  },
  isLoading: false,
  error: null,

  loadInvestments: async () => {
    set({ isLoading: true, error: null });
    try {
      const investments = await getInvestments();
      set({ investments, isLoading: false });
    } catch {
      set({ error: 'Failed to load investments', isLoading: false });
    }
  },

  addInvestment: async investmentData => {
    set({ isLoading: true, error: null });
    try {
      const newInvestment: Investment = {
        ...investmentData,
        id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to storage
      await addInvestmentToStorage(newInvestment);

      // Update summary
      await updateSummaryInStorage();

      // Update state
      const investments = await getInvestments();
      const summary = await getInvestmentSummary();

      set({
        investments,
        investmentSummary: summary,
        isLoading: false,
      });
    } catch {
      set({ error: 'Failed to add investment', isLoading: false });
    }
  },

  updateInvestment: async (investmentId, updates) => {
    set({ isLoading: true, error: null });
    try {
      await updateInvestmentInStorage(investmentId, {
        ...updates,
        updatedAt: new Date(),
      });

      // Update summary
      await updateSummaryInStorage();

      // Update state
      const investments = await getInvestments();
      const summary = await getInvestmentSummary();

      set({
        investments,
        investmentSummary: summary,
        isLoading: false,
      });
    } catch {
      set({ error: 'Failed to update investment', isLoading: false });
    }
  },

  loadInvestmentSummary: async () => {
    set({ isLoading: true, error: null });
    try {
      const summary = await getInvestmentSummary();
      set({ investmentSummary: summary, isLoading: false });
    } catch {
      set({ error: 'Failed to load investment summary', isLoading: false });
    }
  },

  refreshData: async () => {
    await get().loadInvestments();
    await get().loadInvestmentSummary();
  },
}));
