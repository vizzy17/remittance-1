import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import { AuthConfig } from './auth.types';
import { handleAuthError } from './auth.utils';

export class AuthService {
  private static instance: AuthService;
  private auth: firebase.Auth;

  private constructor() {
    this.auth = firebase.auth();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<firebase.User> {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw handleAuthError(error);
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }
}