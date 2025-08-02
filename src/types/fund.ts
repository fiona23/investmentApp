export interface FundPerformance {
  oneYear: number;
  threeYear: number;
  fiveYear: number;
  sinceInception: number;
}

export interface FundPortfolio {
  ukEquities: number;
  globalEquities: number;
  bonds: number;
  cash: number;
  property?: number;
}

export interface Fund {
  id: string;
  name: string;
  category: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Medium-High';
  fundSize: number;
  minInvestment: number;
  description: string;
  performance: FundPerformance;
  portfolio: FundPortfolio;
}

export interface FundSelection {
  fundId: string;
  fundName: string;
  amount: number;
}
