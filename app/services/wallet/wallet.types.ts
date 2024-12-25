import { Wallet } from '../../models/wallet.model';

export interface WalletBalance {
  amount: number;
  currency: string;
}

export interface WalletCreationParams {
  userId: string;
  currency: string;
}

export interface WalletError {
  code: string;
  message: string;
}