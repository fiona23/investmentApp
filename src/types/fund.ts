export interface Fund {
  id: string;
  name: string;
  description: string;
  category: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  performance: number; // Annual return percentage
  minInvestment: number;
  maxInvestment: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FundSelection {
  fundId: string;
  selectedAt: Date;
}

export interface FundPerformance {
  fundId: string;
  performance: number;
  period: '1Y' | '3Y' | '5Y';
  date: Date;
}
