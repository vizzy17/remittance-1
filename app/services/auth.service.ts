import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import { Biometrics } from '@nativescript/biometrics';

export class AuthService {
  private static instance: AuthService;
  private auth: firebase.Auth;
  private biometrics: Biometrics;

  private constructor() {
    this.auth = firebase.auth();
    this.biometrics = new Biometrics();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async register(email: string, password: string, phoneNumber: string): Promise<firebase.User> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      // Additional user setup would go here
      return userCredential.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<firebase.User> {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async enableBiometrics(): Promise<boolean> {
    const result = await this.biometrics.available();
    if (result.biometricType !== 'none') {
      return await this.biometrics.verifyFingerprint({
        message: 'Scan your fingerprint to enable biometric login',
      });
    }
    return false;
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }
}