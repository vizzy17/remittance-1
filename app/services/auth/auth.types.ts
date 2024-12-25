export interface AuthConfig {
  useEmailVerification: boolean;
  allowPasswordReset: boolean;
}

export interface AuthError {
  code: string;
  message: string;
}