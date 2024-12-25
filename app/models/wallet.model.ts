export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  stellarPublicKey: string;
  stellarPrivateKey?: string;
  isActive: boolean;
  createdAt: Date;
}