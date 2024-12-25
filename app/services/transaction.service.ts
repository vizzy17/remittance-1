import { Observable } from '@nativescript/core';
import { Transaction, TransactionStatus } from '../models/transaction.model';
import { WalletService } from './wallet.service';

export class TransactionService extends Observable {
  private static instance: TransactionService;
  private walletService: WalletService;

  private constructor() {
    super();
    this.walletService = WalletService.getInstance();
  }

  public static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService();
    }
    return TransactionService.instance;
  }

  async createTransaction(
    userId: string,
    recipientId: string,
    amount: number,
    sourceCurrency: string,
    targetCurrency: string
  ): Promise<Transaction> {
    // TODO: Implement proper exchange rate fetching
    const exchangeRate = 1.0;
    const fees = amount * 0.01; // 1% fee

    const transaction: Transaction = {
      id: Math.random().toString(36).substring(7),
      userId,
      recipientId,
      amount,
      sourceCurrency,
      targetCurrency,
      exchangeRate,
      fees,
      status: 'pending',
      type: 'send',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // TODO: Save transaction to database
    return transaction;
  }

  async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatus
  ): Promise<void> {
    // TODO: Update transaction status in database
    console.log(`Transaction ${transactionId} status updated to ${status}`);
  }
}