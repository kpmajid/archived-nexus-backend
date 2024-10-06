import { IEmailService } from "../../domain/interfaces/IEmailService";

export class EmailService {
  constructor(private emailService: IEmailService) {}

  async sendOTP(email: string, otp: string): Promise<void> {
    await this.emailService.sendOTP(email, otp);
  }

  async sendPasswordResetEmail(
    email: string,
    resetToken: string
  ): Promise<void> {
    await this.emailService.sendPasswordResetLink(email, resetToken);
  }

  async sendProjectInvitationEmail(
    email: string,
    invitationToken: string,
    inviterName: string,
    projectName: string
  ): Promise<void> {
    await this.emailService.sendProjectInvitationLink(
      email,
      invitationToken,
      inviterName,
      projectName
    );
  }
}
