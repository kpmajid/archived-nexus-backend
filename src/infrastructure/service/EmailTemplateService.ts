// src/infrastructure/service/EmailTemplateService.ts
export class EmailTemplateService {
  private templates: { [key: string]: (data: any) => string } = {
    otp: (data: { otp: string }) => `
      <h1>Your OTP</h1>
      <p>Enter the following OTP to verify your account: <strong>${data.otp}</strong></p>
    `,
    passwordReset: (data: { resetLink: string }) => `
      <h1>Password Reset</h1>
      <p>Click the following link to reset your password: <a href="${data.resetLink}">Reset Password</a></p>
    `,
    // Add more templates as needed
  };

  getTemplate(templateName: string, data: any): string {
    const template = this.templates[templateName];
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }
    return template(data);
  }
}
