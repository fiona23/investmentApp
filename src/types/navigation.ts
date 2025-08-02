export type RootStackParamList = {
  Main: undefined;
  FundSelection: undefined;
  InvestmentAmount: { fundId: string };
  InvestmentSummary: { fundId: string; amount: number };
  InvestmentHistory: undefined;
};

export type TabParamList = {
  Account: undefined;
  Funds: undefined;
  Profile: undefined;
};

export type RootTabParamList = {
  Account: undefined;
  Funds: undefined;
  Profile: undefined;
};
