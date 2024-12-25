import { Observable } from '@nativescript/core';
import { Transaction } from '../../models/transaction.model';
import { WalletService } from '../../services/wallet.service';
import { formatCurrency } from '../../utils/currency.utils';

export class HomeViewModel extends Observable {
  private walletService: WalletService;
  private _balance: number = 0;
  private _currency: string = 'USD';
  private _recentTransactions: Transaction[] = [];

  constructor() {
    super();
    this.walletService = WalletService.getInstance();
    this.loadData();
  }

  get formattedBalance(): string {
    return formatCurrency(this._balance, this._currency);
  }

  get currency(): string {
    return this._currency;
  }

  get recentTransactions(): Transaction[] {
    return this._recentTransactions;
  }

  async loadData() {
    try {
      // TODO: Load actual wallet data
      this._balance = 1000;
      this._currency = 'USD';
      
      // Sample transactions for display
      this._recentTransactions = [
        {
          id: '1',
          userId: 'user1',
          recipientId: 'John Doe',
          amount: 100,
          sourceCurrency: 'USD',
          targetCurrency: 'EUR',
          exchangeRate: 0.85,
          fees: 1,
          status: 'completed',
          type: 'send',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          userId: 'user1',
          recipientId: 'Jane Smith',
          amount: 50,
          sourceCurrency: 'USD',
          targetCurrency: 'GBP',
          exchangeRate: 0.73,
          fees: 0.5,
          status: 'completed',
          type: 'receive',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      this.notifyPropertyChange('formattedBalance', this.formattedBalance);
      this.notifyPropertyChange('currency', this.currency);
      this.notifyPropertyChange('recentTransactions', this.recentTransactions);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  onSendMoney() {
    // TODO: Navigate to send money page
    console.log('Navigate to send money');
  }

  onAddFunds() {
    // TODO: Navigate to add funds page
    console.log('Navigate to add funds');
  }
}