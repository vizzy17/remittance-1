export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  walletAddress?: string;
  localCurrency: string;
}