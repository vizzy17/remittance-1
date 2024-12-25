export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const calculateFees = (amount: number, feePercentage: number = 0.01): number => {
  return amount * feePercentage;
};

export const validateAmount = (amount: number, minAmount: number = 1): boolean => {
  return amount >= minAmount && !isNaN(amount) && isFinite(amount);
};