// src/infrastructure/service/EmailTemplateService.ts
export class EmailTemplateService {
  private templates: { [key: string]: (data: any) => string } = {
    otp: (data: { otp: string }) => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your OTP</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .container { background-color: #f9f9f9; border-radius: 5px; padding: 20px; }
            h1 { color: #2c3e50; }
            .otp { font-size: 24px; font-weight: bold; color: #3498db; letter-spacing: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Your One-Time Password</h1>
            <p>Enter the following OTP to verify your account:</p>
            <p class="otp">${data.otp}</p>
            <p>This OTP will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
          </div>
        </body>
      </html>
    `,
    passwordReset: (data: { resetLink: string }) => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .container { background-color: #f9f9f9; border-radius: 5px; padding: 20px; }
            h1 { color: #2c3e50; }
            .button { display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset Request</h1>
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            <p><a href="${data.resetLink}" class="button">Reset Password</a></p>
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
          </div>
        </body>
      </html>
    `,
    projectInvitation: (data: {
      inviterName: string;
      projectName: string;
      inviteLink: string;
    }) => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Project Invitation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .container { background-color: #f9f9f9; border-radius: 5px; padding: 20px; }
            h1 { color: #2c3e50; }
            .button { display: inline-block; padding: 10px 20px; background-color: #27ae60; color: #ffffff; text-decoration: none; border-radius: 5px; }
            .highlight { font-weight: bold; color: #3498db; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>You're Invited to Join a Project!</h1>
            <p>Hello,</p>
            <p><span class="highlight">${data.inviterName}</span> has invited you to collaborate on the project: <span class="highlight">${data.projectName}</span>.</p>
            <p>To accept this invitation and join the project, please click the button below:</p>
            <p><a href="${data.inviteLink}" class="button">Accept Invitation</a></p>
            <p>If you're unable to click the button, you can copy and paste the following link into your browser:</p>
            <p>${data.inviteLink}</p>
            <p>This invitation will expire in 7 days. If you don't wish to join this project or if you received this email by mistake, you can safely ignore it.</p>
            <p>We're excited to have you on board!</p>
          </div>
        </body>
      </html>
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
