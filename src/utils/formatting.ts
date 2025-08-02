export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(1)}%`;
};

export const formatDate = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  } catch {
    return 'Invalid date';
  }
};

export const formatRiskLevel = (riskLevel: string): string => {
  return riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
};

export const formatCategory = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export const formatStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
