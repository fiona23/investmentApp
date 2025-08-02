import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Fund } from '../types/fund';
import { Investment, InvestmentSummary } from '../types/investment';

const mockInvestmentSummary: InvestmentSummary = {
  totalInvested: 0,
  investmentCount: 0,
  currentYearTotal: 0,
  remainingISALimit: 20000, // £20k ISA limit
  averageReturn: 0,
};

const mockInvestments: Investment[] = [];

// Fund data with detailed information
const mockFunds: Fund[] = [
  {
    id: 'equities-fund',
    name: 'Cushon Equities Fund',
    category: 'Equities',
    riskLevel: 'Medium',
    fundSize: 1500000000, // £1.5bn
    minInvestment: 100,
    description:
      'A diversified portfolio of global equities designed for long-term growth.',
    performance: {
      oneYear: 8.5,
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
  {
    id: 'bonds-fund',
    name: 'Cushon Bonds Fund',
    category: 'Bonds',
    riskLevel: 'Low',
    fundSize: 800000000, // £800m
    minInvestment: 100,
    description:
      'A conservative bond portfolio focused on capital preservation and steady income.',
    performance: {
      oneYear: 4.2,
      threeYear: 6.8,
      fiveYear: 8.1,
      sinceInception: 9.5,
    },
    portfolio: {
      ukEquities: 10,
      globalEquities: 5,
      bonds: 70,
      cash: 15,
    },
  },
  {
    id: 'property-fund',
    name: 'Cushon Property Fund',
    category: 'Property',
    riskLevel: 'Medium-High',
    fundSize: 1200000000, // £1.2bn
    minInvestment: 100,
    description:
      'A diversified property portfolio including commercial and residential real estate.',
    performance: {
      oneYear: 6.8,
      threeYear: 9.2,
      fiveYear: 11.5,
      sinceInception: 13.8,
    },
    portfolio: {
      ukEquities: 15,
      globalEquities: 10,
      bonds: 20,
      cash: 5,
      property: 50,
    },
  },
];

// Simple API functions
const fetchInvestmentSummary = async (): Promise<InvestmentSummary> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockInvestmentSummary;
};

const fetchInvestments = async (): Promise<Investment[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockInvestments;
};

const fetchFunds = async (): Promise<Fund[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  return mockFunds;
};

const fetchFundDetails = async (fundId: string): Promise<Fund | null> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockFunds.find(fund => fund.id === fundId) || null;
};

const createInvestment = async (
  investment: Omit<
    Investment,
    'id' | 'date' | 'status' | 'createdAt' | 'updatedAt'
  >
): Promise<Investment> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const newInvestment: Investment = {
    id: Date.now().toString(),
    ...investment,
    date: new Date(),
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return newInvestment;
};

// React Query hooks
export const useInvestmentSummary = () => {
  return useQuery({
    queryKey: ['investments', 'summary'],
    queryFn: fetchInvestmentSummary,
  });
};

export const useInvestments = () => {
  return useQuery({
    queryKey: ['investments', 'list'],
    queryFn: fetchInvestments,
  });
};

export const useFunds = () => {
  return useQuery({
    queryKey: ['funds', 'list'],
    queryFn: fetchFunds,
  });
};

export const useFundDetails = (fundId: string) => {
  return useQuery({
    queryKey: ['funds', 'details', fundId],
    queryFn: () => fetchFundDetails(fundId),
    enabled: !!fundId,
  });
};

export const useCreateInvestment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvestment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
    },
  });
};

export const useHasInvestments = () => {
  const { data: investments, isLoading, error } = useInvestments();

  return {
    hasInvestments: investments && investments.length > 0,
    isLoading,
    error,
  };
};
