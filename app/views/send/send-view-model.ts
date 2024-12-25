import { Observable } from '@nativescript/core';
import { TransferService } from '../../services/transfer.service';
import { ErrorHandler } from '../../utils/error-handler';
import { formatCurrency } from '../../utils/currency.utils';

export class SendViewModel extends Observable {
  private transferService: TransferService;
  
  public recipientId: string = '';
  public amount: string = '';
  public currencies: string[] = ['USD', 'EUR', 'GBP'];
  public selectedCurrencyIndex: number = 0;
  public isProcessing: boolean = false;
  public errorMessage: string = '';
  
  constructor() {
    super();
    this.transferService = TransferService.getInstance();
  }
  
  get exchangeRateInfo(): string {
    const sourceCurrency = this.currencies[this.selectedCurrencyIndex];
    return `Exchange Rate: 1 ${sourceCurrency} = 1.00 USD`;
  }
  
  get feeInfo(): string {
    const amount = parseFloat(this.amount) || 0;
    const fee = amount * 0.01;
    return `Fee: ${formatCurrency(fee, this.currencies[this.selectedCurrencyIndex])}`;
  }
  
  get totalInfo(): string {
    const amount = parseFloat(this.amount) || 0;
    const fee = amount * 0.01;
    const total = amount + fee;
    return `Total: ${formatCurrency(total, this.currencies[this.selectedCurrencyIndex])}`;
  }
  
  async onSendMoney() {
    try {
      this.isProcessing = true;
      this.errorMessage = '';
      
      const amount = parseFloat(this.amount);
      if (!amount || amount <= 0) {
        throw new Error('Invalid amount');
      }
      
      if (!this.recipientId) {
        throw new Error('Invalid recipient');
      }
      
      const sourceCurrency = this.currencies[this.selectedCurrencyIndex];
      
      await this.transferService.initiateTransfer(
        'current_user_id', // TODO: Get from auth service
        this.recipientId,
        amount,
        sourceCurrency,
        'USD'
      );
      
      // Navigate back to home
      // TODO: Implement navigation
      
    } catch (error) {
      this.errorMessage = ErrorHandler.handle(error);
    } finally {
      this.isProcessing = false;
    }
  }
}