import { Observable } from '@nativescript/core';
import { Transaction, TransactionStatus } from '../../models/transaction.model';
import { TransactionCreateParams, TransactionError } from './transaction.types';
import { handleTransactionError, generateTransactionId } from './transaction.utils';

export class TransactionService extends Observable {
  private static instance: TransactionService;

  private constructor() {
    super();
  }

  public static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  async createTransaction(params: TransactionCreateParams): Promise<Transaction> {
    try {
      const exchangeRate = 1.0; // TODO: Implement exchange rate service
      const fees = params.amount * 0.01;

      const transaction: Transaction = {
        id: generateTransactionId(),
        userId: params.userId,
        recipientId: params.recipientId,
        amount: params.amount,
        sourceCurrency: params.sourceCurrency,
        targetCurrency: params.targetCurrency,
        exchangeRate,
        fees,
        status: 'pending',
        type: 'send',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return transaction;
    } catch (error) {
      throw handleTransactionError(error);
    }
  }

  async updateTransactionStatus(transactionId: string, status: TransactionStatus): Promise<void> {
    try {
      // TODO: Implement database update
      console.log(`Transaction ${transactionId} status updated to ${status}`);
    } catch (error) {
      throw handleTransactionError(error);
    }
  }
}