import { Observable } from '@nativescript/core';
import { Wallet } from '../models/wallet.model';
import * as StellarSdk from 'stellar-sdk';

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

  async createWallet(userId: string, currency: string): Promise<Wallet> {
    const pair = StellarSdk.Keypair.random();
    
    const wallet: Wallet = {
      id: pair.publicKey(),
      userId,
      balance: 0,
      currency,
      stellarPublicKey: pair.publicKey(),
      stellarPrivateKey: pair.secret(),
      isActive: true,
      createdAt: new Date()
    };

    // TODO: Save wallet to database
    return wallet;
  }

  async getBalance(publicKey: string): Promise<number> {
    try {
      const account = await this.server.loadAccount(publicKey);
      const balance = account.balances.find(b => b.asset_type === 'native');
      return balance ? parseFloat(balance.balance) : 0;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }
}