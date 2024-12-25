import { AuthError } from './auth.types';

export function handleAuthError(error: any): AuthError {
  const code = error.code || 'auth/unknown';
  let message = 'An authentication error occurred';

  switch (code) {
    case 'auth/invalid-email':
      message = 'Invalid email address';
      break;
    case 'auth/user-disabled':
      message = 'This account has been disabled';
      break;
    case 'auth/user-not-found':
      message = 'User not found';
      break;
    case 'auth/wrong-password':
      message = 'Invalid password';
      break;
  }

  return { code, message };
}