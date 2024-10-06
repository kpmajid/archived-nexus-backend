import { IUserRepository } from "../../domain/interfaces/Repository/IUserRepository";
import { User } from "../../domain/entities/User";

import { EmailService } from "../services/EmailService";

import { IEmailService } from "../../domain/interfaces/IEmailService";
import { IOTPRepository } from "../../domain/interfaces/Repository/IOTPRepository";

import { IJWTService } from "../../domain/interfaces/IJWTService";
import { IHashingAdapter } from "../../domain/interfaces/IHashingAdapter";

import {
  AuthenticationError,
  EmailOTPRequiredError,
  EmailPasswordRequiredError,
  EmailRequiredError,
  InvalidCredentialsError,
  InvalidOtpError,
  NoRefreshToken,
  OtpExpiredError,
  OtpNotFoundError,
  TokenNewPasswordRequiredError,
  UnverifiedEmailError,
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../../domain/errors/AuthErrors";

import { ObjectId } from "mongoose";
import { IPasswordResetTokenRepository } from "../../domain/interfaces/Repository/IPasswordResetTokenRepository";

interface LoginResponse {
  id: string | ObjectId;
  name: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
}

export class AuthUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashingAdapter: IHashingAdapter,
    private otpRepository: IOTPRepository,
    private jwtService: IJWTService,
    private emailService: EmailService,
    private passwordResetTokenRepository: IPasswordResetTokenRepository
  ) {}

  async register(userData: User): Promise<void> {
    if (!userData.email || !userData.password) {
      throw new EmailPasswordRequiredError();
    }

    const isUserExist = await this.userRepository.findByEmail(userData.email);
    if (isUserExist) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.hashingAdapter.hash(userData.password, 8);
    userData.password = hashedPassword;

    await this.userRepository.create(userData);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await this.hashingAdapter.hash(otp, 8);

    const type = "verification";
    await this.otpRepository.saveOtp(userData.email, hashedOtp, type);

    await this.emailService.sendOTP(userData.email, otp);
  }

  async login(userData: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    if (!userData.email || !userData.password) {
      throw new EmailPasswordRequiredError();
    }

    const user = await this.userRepository.findByEmail(userData.email);
    if (!user) {
      throw new UserNotFoundError(`User does not exist`);
    }

    if (!user.isVerified) {
      throw new UnverifiedEmailError("email not verified");
    }

    const isPasswordValid = await this.hashingAdapter.compare(
      userData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Invalid email or password");
    }
    //generate access toke!
    const accessToken = this.jwtService.generateAccessToken(
      user._id,
      user.name,
      user.email
    );
    const refreshToken = this.jwtService.generateRefreshToken(user._id);

    await this.userRepository.saveRefreshToken(user._id, refreshToken);

    return {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
      refreshToken,
    };
  }

  async verifyOTP(email: string, otp: string): Promise<void> {
    if (!email || !otp) {
      throw new EmailOTPRequiredError();
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    const type = "verification";

    const otpObj = await this.otpRepository.findOtpByEmail(email, type);
    if (!otpObj) {
      throw new OtpNotFoundError();
    }

    const currentTime = new Date();

    const expirationDate = new Date(otpObj.expireAt);
    if (currentTime > expirationDate) {
      const timeDifference = otpObj.expireAt.getTime() - currentTime.getTime();
      throw new OtpExpiredError();
    }

    const isOTPValid = await this.hashingAdapter.compare(otp, otpObj.otp);
    if (!isOTPValid) {
      throw new InvalidOtpError();
    }

    await this.userRepository.verifyUser(email);
  }

  async resendOTP(email: string): Promise<void> {
    if (!email) {
      throw new EmailRequiredError();
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await this.hashingAdapter.hash(otp, 8);

    const type = "verification";
    await this.otpRepository.saveOtp(email, hashedOtp, type);

    return this.emailService.sendOTP(user.email, otp);
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    newAccessToken: string;
    newRefreshToken: string;
    avatar: string;
  }> {
    if (!refreshToken) {
      throw new NoRefreshToken("Refresh token not found");
    }

    const userId = this.jwtService.verifyRefreshToken(refreshToken);
    const user = await this.userRepository.findById(userId);

    if (!user || user?.refreshToken?.trim() !== refreshToken?.trim()) {
      throw new AuthenticationError("Authentication failed");
    }

    const newAccessToken = this.jwtService.generateAccessToken(
      userId,
      user.name,
      user.email
    );

    const newRefreshToken = this.jwtService.generateRefreshToken(userId);

    await this.userRepository.saveRefreshToken(userId, newRefreshToken);

    return { newAccessToken, newRefreshToken, avatar: user.avatar };
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      throw new AuthenticationError("Refresh token is required for logout");
    }

    const userId = this.jwtService.verifyRefreshToken(refreshToken);
    if (!userId) {
      throw new AuthenticationError("User ID is required for logout");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError("User not found");
    }

    // Invalidate the refresh token
    await this.userRepository.invalidateRefreshToken(userId);
  }

  async initiatePasswordReset(email: string): Promise<void> {
    if (!email) {
      throw new EmailRequiredError();
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError("User does not exists!");
    }

    const resentToken = this.jwtService.generatePasswordResetToken(user._id);

    const userId = user._id;
    await this.passwordResetTokenRepository.create(userId, resentToken);
    await this.emailService.sendPasswordResetEmail(email, resentToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    if (!token || !newPassword) {
      throw new TokenNewPasswordRequiredError();
    }

    const tokenData = await this.passwordResetTokenRepository.findByToken(
      token
    );

    if (!tokenData) {
      throw new Error("Invalid or expired token");
    }

    const { userId, createdAt } = tokenData;

    const now = new Date();
    const tokenAge = now.getTime() - createdAt.getTime();
    if (tokenAge > 3600000) {
      // 1 hour expiration
      throw new Error("Token expired");
    }

    const hashedPassword = await this.hashingAdapter.hash(newPassword, 8);
    await this.userRepository.updatePassword(userId, hashedPassword);
    await this.passwordResetTokenRepository.deleteByUserId(userId);
  }
}
