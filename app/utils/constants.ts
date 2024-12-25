import { Device } from '@nativescript/core';

export const APP_CONSTANTS = {
  CURRENCIES: ['USD', 'EUR', 'GBP'],
  TRANSFER_FEE_PERCENTAGE: 0.01,
  MIN_TRANSFER_AMOUNT: 1,
  MAX_TRANSFER_AMOUNT: 10000,
  PLATFORM: Device.os.toLowerCase(),
  API_TIMEOUT: 30000
};