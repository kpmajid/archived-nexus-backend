export interface IEmailService {
  sendOTP(email: string, otp: string): Promise<void>;
  sendPasswordResetLink(email: string, resetToken: string): Promise<void>;
}
