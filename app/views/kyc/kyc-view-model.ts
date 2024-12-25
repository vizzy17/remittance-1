import { Observable } from '@nativescript/core';
import { KYCService } from '../../services/kyc.service';
import { ErrorHandler } from '../../utils/error-handler';

export class KYCViewModel extends Observable {
  private kycService: KYCService;
  
  public documentTypes = ['Passport', 'ID Card', 'Driver\'s License'];
  public selectedDocumentIndex = 0;
  public frontImage: string | null = null;
  public backImage: string | null = null;
  public selfieImage: string | null = null;
  public statusMessage: string = '';
  
  constructor() {
    super();
    this.kycService = KYCService.getInstance();
  }
  
  get canSubmit(): boolean {
    return !!(this.frontImage && this.selfieImage);
  }
  
  async onUploadFront() {
    // TODO: Implement image picker
    this.frontImage = 'dummy_image_url';
    this.notifyPropertyChange('frontImage', this.frontImage);
    this.notifyPropertyChange('canSubmit', this.canSubmit);
  }
  
  async onUploadBack() {
    this.backImage = 'dummy_image_url';
    this.notifyPropertyChange('backImage', this.backImage);
  }
  
  async onTakeSelfie() {
    this.selfieImage = 'dummy_image_url';
    this.notifyPropertyChange('selfieImage', this.selfieImage);
    this.notifyPropertyChange('canSubmit', this.canSubmit);
  }
  
  async onSubmit() {
    try {
      const docType = this.documentTypes[this.selectedDocumentIndex].toLowerCase().replace(' ', '_');
      
      await this.kycService.submitDocuments('current_user_id', {
        type: docType as any,
        frontImage: this.frontImage!,
        backImage: this.backImage || undefined,
        selfieImage: this.selfieImage!
      });
      
      this.statusMessage = 'Documents submitted successfully! We\'ll review them shortly.';
    } catch (error) {
      this.statusMessage = ErrorHandler.handle(error);
    }
  }
}