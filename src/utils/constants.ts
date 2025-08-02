export const APP_CONSTANTS = {
  ISA_ANNUAL_LIMIT: 20000,
  MIN_INVESTMENT: 100,
  MAX_INVESTMENT: 20000,
  CURRENCY: 'GBP',
  DATE_FORMAT: 'dd/MM/yyyy',
  DECIMAL_PLACES: 2,
} as const;

export const FUND_CATEGORIES = [
  'Equities',
  'Bonds',
  'Property',
  'Multi-Asset',
  'Cash',
] as const;

export const RISK_LEVELS = ['Low', 'Medium', 'High'] as const;

export const STORAGE_KEYS = {
  INVESTMENTS: 'investments',
  SELECTED_FUND: 'selectedFund',
  USER_PREFERENCES: 'userPreferences',
} as const;

export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  LOADING_TIMEOUT: 10000,
} as const;

// Mock fund data for development
export const FUND_DATA = [
  {
    id: 'cushon-equities-fund',
    name: 'Cushon Equities Fund',
    description:
      'A diversified portfolio of global equities with a focus on sustainable companies',
    category: 'Equities',
    riskLevel: 'Medium' as const,
    performance: 8.5,
    minInvestment: 100,
    maxInvestment: 20000,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cushon-bonds-fund',
    name: 'Cushon Bonds Fund',
    description: 'A conservative portfolio of government and corporate bonds',
    category: 'Bonds',
    riskLevel: 'Low' as const,
    performance: 3.2,
    minInvestment: 100,
    maxInvestment: 20000,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cushon-property-fund',
    name: 'Cushon Property Fund',
    description:
      'A portfolio of commercial and residential property investments',
    category: 'Property',
    riskLevel: 'Medium' as const,
    performance: 6.8,
    minInvestment: 100,
    maxInvestment: 20000,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'cushon-multi-asset-fund',
    name: 'Cushon Multi-Asset Fund',
    description: 'A balanced portfolio across multiple asset classes',
    category: 'Multi-Asset',
    riskLevel: 'Medium' as const,
    performance: 7.2,
    minInvestment: 100,
    maxInvestment: 20000,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
] as const;
