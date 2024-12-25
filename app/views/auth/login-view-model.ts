import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class LoginViewModel extends Observable {
  private authService: AuthService;
  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor() {
    super();
    this.authService = AuthService.getInstance();
  }

  async onLogin() {
    try {
      if (!this.email || !this.password) {
        this.notifyPropertyChange('errorMessage', 'Please fill in all fields');
        return;
      }

      const user = await this.authService.login(this.email, this.password);
      // Navigate to dashboard on successful login
      // TODO: Implement navigation
    } catch (error) {
      this.notifyPropertyChange('errorMessage', error.message);
    }
  }

  async onEnableBiometrics() {
    try {
      const enabled = await this.authService.enableBiometrics();
      if (enabled) {
        this.notifyPropertyChange('errorMessage', 'Biometrics enabled successfully');
      } else {
        this.notifyPropertyChange('errorMessage', 'Biometrics not available');
      }
    } catch (error) {
      this.notifyPropertyChange('errorMessage', error.message);
    }
  }

  onNavigateToRegister() {
    // TODO: Implement navigation to register page
  }
}