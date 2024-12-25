import { Transaction, TransactionStatus, TransactionType } from '../../models/transaction.model';

export interface TransactionCreateParams {
  userId: string;
  recipientId: string;
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
}

export interface TransactionError {
  code: string;
  message: string;
}