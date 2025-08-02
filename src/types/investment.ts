export interface Investment {
  id: string;
  fundId: string;
  fundName: string;
  amount: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface InvestmentSummary {
  totalInvested: number;
  investmentCount: number;
  currentYearTotal: number;
  remainingISALimit: number;
  averageReturn: number;
}

export interface InvestmentForm {
  fundId: string;
  amount: number;
}

export interface InvestmentValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
