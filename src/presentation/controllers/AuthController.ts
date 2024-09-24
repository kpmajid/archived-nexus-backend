import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/entities/User";
import { AuthUseCase } from "../../application/useCase/AuthUseCase";

import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { MongoOtpRepository } from "../../infrastructure/repositories/MongoOtpRepository";

import { BcryptHashingAdapter } from "../../infrastructure/adapters/BcryptHashingAdapter";
import { NodemailerEmailService } from "../../infrastructure/service/NodemailerEmailService";
import { JWTService } from "../../infrastructure/service/JWTService";

import { EmailService } from "../../application/services/EmailService";
import { EmailTemplateService } from "../../infrastructure/service/EmailTemplateService";
import { MongoPasswordResetTokenRepository } from "../../infrastructure/repositories/MongoPasswordResetTokenRepository";

export class AuthController {
  private authUseCase: AuthUseCase;

  constructor() {
    const userRepository = new MongoUserRepository();
    const otpRepository = new MongoOtpRepository();
    const hashingAdapter = new BcryptHashingAdapter();
    const jwtService = new JWTService();
    const emailTemplateService = new EmailTemplateService();
    const passwordResetTokenRepository =
      new MongoPasswordResetTokenRepository();

    const nodemailerEmailService = new NodemailerEmailService(
      emailTemplateService
    );

    const emailService = new EmailService(
      nodemailerEmailService,
      otpRepository,
      hashingAdapter
    );

    this.authUseCase = new AuthUseCase(
      userRepository,
      hashingAdapter,
      otpRepository,
      jwtService,
      emailService,
      passwordResetTokenRepository
    );
  }

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: User = req.body;
      await this.authUseCase.register(userData);
      res.status(201).send({ message: "User registered successfully" });
    } catch (err) {
      next(err);
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      const { id, name, avatar, accessToken, refreshToken } =
        await this.authUseCase.login({
          email,
          password,
        });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });

      res.status(200).send({
        message: "User logged successfully",
        id: id,
        name: name,
        avatar: avatar,
        email: email,
        accessToken: accessToken,
      });
    } catch (err) {
      next(err);
    }
  };

  public logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken) {
        await this.authUseCase.logout(refreshToken);
      }

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });

      res.status(200).send({ message: "User logged out successfully" });
    } catch (err) {
      next(err);
    }
  };

  public verifyOTP = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, otp } = req.body;
      await this.authUseCase.verifyOTP(email, otp);
      res.status(201).send({ message: "User verified successfully" });
    } catch (err) {
      next(err);
    }
  };

  public resendOTP = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.body;
      await this.authUseCase.resendOTP(email);
      res.status(200).send({ message: "OTP resent successfully" });
    } catch (err) {
      next(err);
    }
  };

  public refreshAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      const { newAccessToken, newRefreshToken, avatar } =
        await this.authUseCase.refreshAccessToken(refreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
      });

      res.status(200).send({
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
        avatar,
      });
    } catch (err) {
      next(err);
    }
  };

  public initiatePasswodReset = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      await this.authUseCase.initiatePasswordReset(email);
      res.status(200).send({ message: "Password reset link sent to email" });
    } catch (err) {
      next(err);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token, password } = req.body;
      await this.authUseCase.resetPassword(token, password);
      res.status(200).send({ message: "Password reset successfully" });
    } catch (err) {
      next(err);
    }
  };
}
