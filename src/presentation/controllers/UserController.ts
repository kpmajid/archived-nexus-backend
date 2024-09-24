import { NextFunction, Request, Response } from "express";
import { UserUseCase } from "../../application/useCase/UserUseCase";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { CloudinaryService } from "../../infrastructure/service/CloudinaryService";
import { NodemailerEmailService } from "../../infrastructure/service/NodemailerEmailService";
import { EmailService } from "../../application/services/EmailService";
import { MongoOtpRepository } from "../../infrastructure/repositories/MongoOtpRepository";
import { BcryptHashingAdapter } from "../../infrastructure/adapters/BcryptHashingAdapter";
import { EmailTemplateService } from "../../infrastructure/service/EmailTemplateService";

export class UserController {
  private userUseCase: UserUseCase;
  constructor() {
    const userRepository = new MongoUserRepository();
    const imageUploadService = new CloudinaryService();
    const emailTemplateService = new EmailTemplateService();

    const nodemailerEmailService = new NodemailerEmailService(
      emailTemplateService
    );

    const otpRepository = new MongoOtpRepository();
    const hashingAdapter = new BcryptHashingAdapter();

    const emailService = new EmailService(
      nodemailerEmailService,
      otpRepository,
      hashingAdapter
    );

    this.userUseCase = new UserUseCase(
      userRepository,
      otpRepository,
      hashingAdapter,
      imageUploadService,
      emailService
    );
  }

  public updateName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user } = res.locals;
      const id = user.id;
      const { name } = req.body;

      const updatedUser = await this.userUseCase.updateName(id, name);

      res.status(200).json({
        message: "Name updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  public requestEmailChangeOTP = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user } = res.locals;
      const id = user.id;
      const { email } = req.body;

      await this.userUseCase.requestEmailChangeOTP(id, email);

      res.status(200).json({
        message: "OTP sent to new email address",
      });
    } catch (err) {
      next(err);
    }
  };

  public updateEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user } = res.locals;
      const id = user.id;
      const { email, otp } = req.body;

      const updatedUser = await this.userUseCase.updateEmail(id, email, otp);

      res.status(200).json({
        message: "Email updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  public updateAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user } = res.locals;
      const id = user.id;
      const file = req.file;
      if (!id || !file) {
        return;
      }

      const updatedUser = await this.userUseCase.updateAvatar(id, file);

      res.status(200).json({
        message: "Avatar updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  public updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user } = res.locals;
      const id = user.id;
      const { password } = req.body;

      if (!id || !password) {
        return;
      }

      const updatedUser = await this.userUseCase.updatePassword(id, password);

      res.status(200).json({
        message: "Password updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.params.id;
    console.log(userId);
  };

  public searchUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.query;
    console.log(email);
  };
}
