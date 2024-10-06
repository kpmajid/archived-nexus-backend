export interface IEmailService {
  sendOTP(email: string, otp: string): Promise<void>;
  sendPasswordResetLink(email: string, resetToken: string): Promise<void>;
  sendProjectInvitationLink(
    email: string,
    invitationToken: string,
    inviterName: string,
    projectName: string
  ): Promise<void>;
}
