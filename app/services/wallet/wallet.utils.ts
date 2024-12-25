import { WalletError } from './wallet.types';
import * as StellarSdk from 'stellar-sdk';

export function handleWalletError(error: any): WalletError {
  const code = error.code || 'wallet/unknown';
  let message = 'A wallet error occurred';

  switch (code) {
    case 'wallet/insufficient-funds':
      message = 'Insufficient funds in wallet';
      break;
    case 'wallet/invalid-currency':
      message = 'Invalid currency specified';
      break;
    case 'wallet/network-error':
      message = 'Network error occurred';
      break;
    default:
      message = error.message || message;
  }

  return { code, message };
}

export function createStellarKeyPair(): { publicKey: string; privateKey: string } {
  const pair = StellarSdk.Keypair.random();
  return {
    publicKey: pair.publicKey(),
    privateKey: pair.secret()
  };
}