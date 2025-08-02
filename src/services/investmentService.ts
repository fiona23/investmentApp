import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Investment, InvestmentSummary } from '../types/investment';

const mockInvestmentSummary: InvestmentSummary = {
  totalInvested: 25000,
  investmentCount: 3,
  currentYearTotal: 25000,
  remainingISALimit: 0,
  averageReturn: 6.8,
};

const mockInvestments: Investment[] = [
  {
    id: '1',
    fundId: 'equities-fund',
    fundName: 'Cushon Equities Fund',
    amount: 25000,
    date: new Date('2024-01-15'),
    status: 'confirmed',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    fundId: 'bonds-fund',
    fundName: 'Cushon Bonds Fund',
    amount: 5000,
    date: new Date('2023-12-10'),
    status: 'confirmed',
    createdAt: new Date('2023-12-10'),
    updatedAt: new Date('2023-12-10'),
  },
  {
    id: '3',
    fundId: 'property-fund',
    fundName: 'Cushon Property Fund',
    amount: 10000,
    date: new Date('2023-11-20'),
    status: 'confirmed',
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-11-20'),
  },
];

// Simple API functions
const fetchInvestmentSummary = async (): Promise<InvestmentSummary> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInvestmentSummary;
};

const fetchInvestments = async (): Promise<Investment[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInvestments;
};

const createInvestment = async (
  investment: Omit<
    Investment,
    'id' | 'date' | 'status' | 'createdAt' | 'updatedAt'
  >
): Promise<Investment> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newInvestment: Investment = {
    id: Date.now().toString(),
    ...investment,
    date: new Date(),
    status: 'confirmed',
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
