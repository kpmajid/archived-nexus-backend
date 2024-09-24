import { IEmailService } from "../../domain/interfaces/IEmailService";
import {
  EmailConfigurationError,
  EmailSendError,
} from "../../domain/errors/ServiceErrors/EmailErrors";
import { EmailTemplateService } from "./EmailTemplateService";

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export class NodemailerEmailService implements IEmailService {
  private transporter: nodemailer.Transporter;

  constructor(private emailTemplateService: EmailTemplateService) {
    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      throw new EmailConfigurationError("Email credentials are not configured");
    }

    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  private async sendEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"From Majid" ${process.env.EMAIL}`,
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new EmailSendError(`Failed to send email to ${to}`);
    }
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    const htmlContent = this.emailTemplateService.getTemplate("otp", { otp });
    await this.sendEmail(email, "Verification OTP", htmlContent);
  }

  async sendPasswordResetLink(
    email: string,
    resetToken: string
  ): Promise<void> {
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    const htmlContent = this.emailTemplateService.getTemplate("passwordReset", {
      resetLink,
    });
    await this.sendEmail(email, "Password Reset", htmlContent);
  }
}
