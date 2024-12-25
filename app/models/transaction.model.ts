export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type TransactionType = 'send' | 'receive';

export interface Transaction {
  id: string;
  userId: string;
  recipientId: string;
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
  exchangeRate: number;
  fees: number;
  status: TransactionStatus;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}