export type RootStackParamList = {
  Main: { screen: keyof TabParamList } | undefined;
  FundSelection: undefined;
  InvestmentAmount: { fundId: string };
  InvestmentSummary: { fundId: string; amount: number };
  FundDetails: { fundId: string };
  TransactionHistory: undefined;
};

export type TabParamList = {
  Account: undefined;
  Fund: undefined;
  Profile: undefined;
};

export type RootTabParamList = {
  Main: TabParamList;
};
