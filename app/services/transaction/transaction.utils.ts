import { TransactionError } from './transaction.types';

export function handleTransactionError(error: any): TransactionError {
  const code = error.code || 'transaction/unknown';
  let message = 'A transaction error occurred';

  switch (code) {
    case 'transaction/insufficient-funds':
      message = 'Insufficient funds for transaction';
      break;
    case 'transaction/invalid-amount':
      message = 'Invalid transaction amount';
      break;
    case 'transaction/recipient-not-found':
      message = 'Recipient not found';
      break;
    default:
      message = error.message || message;
  }

  return { code, message };
}

export function generateTransactionId(): string {
  return Math.random().toString(36).substring(7);
}