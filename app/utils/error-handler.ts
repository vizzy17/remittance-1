export class ErrorHandler {
  static handle(error: any): string {
    if (error instanceof Error) {
      // Log error for debugging
      console.error('Application error:', error);

      // Return user-friendly message
      switch (error.message) {
        case 'Insufficient funds':
          return 'You don\'t have enough balance for this transfer.';
        case 'Invalid recipient':
          return 'Please check the recipient details and try again.';
        case 'Network error':
          return 'Connection issue. Please check your internet and try again.';
        default:
          return 'An unexpected error occurred. Please try again later.';
      }
    }
    return 'An unexpected error occurred. Please try again later.';
  }
}