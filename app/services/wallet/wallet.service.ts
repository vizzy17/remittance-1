import { Observable } from '@nativescript/core';
import * as StellarSdk from 'stellar-sdk';
import { Wallet } from '../../models/wallet.model';
import { WalletBalance, WalletCreationParams, WalletError } from './wallet.types';
import { handleWalletError, createStellarKeyPair } from './wallet.utils';

export class WalletService extends Observable {
  private static instance: WalletService;
  private server: StellarSdk.Server;

  private constructor() {
    super();
    this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  }

  public static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  async createWallet(params: WalletCreationParams): Promise<Wallet> {
    try {
      const { publicKey, privateKey } = createStellarKeyPair();
      
      const wallet: Wallet = {
        id: publicKey,
        userId: params.userId,
        balance: 0,
        currency: params.currency,
        stellarPublicKey: publicKey,
        stellarPrivateKey: privateKey,
        isActive: true,
        createdAt: new Date()
      };

      return wallet;
    } catch (error) {
      throw handleWalletError(error);
    }
  }

  async getBalance(publicKey: string): Promise<WalletBalance> {
    try {
      const account = await this.server.loadAccount(publicKey);
      const balance = account.balances.find(b => b.asset_type === 'native');
      
      return {
        amount: balance ? parseFloat(balance.balance) : 0,
        currency: 'XLM'
      };
    } catch (error) {
      throw handleWalletError(error);
    }
  }
}