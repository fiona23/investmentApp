import { Fund } from '../types/fund';
import { InvestmentValidation } from '../types/investment';
import { APP_CONSTANTS } from './constants';

export const validateInvestmentAmount = (
  amount: number,
  fund: Fund
): InvestmentValidation => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (amount <= 0) {
    errors.push('Investment amount must be greater than 0');
  }

  if (amount < fund.minInvestment) {
    errors.push(`Minimum investment is £${fund.minInvestment}`);
  }

  if (amount > APP_CONSTANTS.ISA_ANNUAL_LIMIT) {
    warnings.push(
      `Amount exceeds ISA annual limit of £${APP_CONSTANTS.ISA_ANNUAL_LIMIT}`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

export function validateInvestmentForm(
  fundId: string,
  amount: number,
  fund: Fund
): InvestmentValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!fundId) {
    errors.push('Please select a fund');
  }

  if (!fund) {
    errors.push('Selected fund not found');
    return { isValid: false, errors, warnings };
  }

  const amountValidation = validateInvestmentAmount(amount, fund);
  errors.push(...amountValidation.errors);
  warnings.push(...amountValidation.warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
