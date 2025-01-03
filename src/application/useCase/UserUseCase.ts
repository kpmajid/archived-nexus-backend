import { User } from "../../domain/entities/User";
import {
  InvalidOtpError,
  OtpExpiredError,
  OtpNotFoundError,
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../../domain/errors/AuthErrors";
import { IHashingAdapter } from "../../domain/interfaces/IHashingAdapter";
import { IImageUploadService } from "../../domain/interfaces/IImageUploadService";
import { IOTPRepository } from "../../domain/interfaces/Repository/IOTPRepository";
import { IUserRepository } from "../../domain/interfaces/Repository/IUserRepository";
import { EmailService } from "../services/EmailService";

export class UserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private otpRepository: IOTPRepository,
    private hashingAdapter: IHashingAdapter,
    private imageUploadService: IImageUploadService,
    private emailService: EmailService
  ) {}

  async updateName(id: string, name: string): Promise<User | null> {
    if (!id || name) {
      // throw new IdNameRequiredError();
    }

    const user = await this.userRepository.updateName(id, name);

    return user;
  }

  async updateAvatar(
    id: string,
    file: Express.Multer.File
  ): Promise<User | null> {
    if (!id || file) {
      // throw new IdFileRequiredError();
    }

    const newAvatarUrl = await this.imageUploadService.uploadImage(file);

    const user = await this.userRepository.updateAvatar(id, newAvatarUrl);

    return user;
  }

  async requestEmailChangeOTP(id: string, email: string): Promise<void> {
    const isUserExist = await this.userRepository.findByEmail(email);
    if (isUserExist) {
      throw new UserAlreadyExistsError();
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await this.hashingAdapter.hash(otp, 8);

    const type = "verification";
    await this.otpRepository.saveOtp(email, hashedOtp, type);

    await this.emailService.sendOTP(email, otp);
  }

  async updateEmail(
    id: string,
    email: string,
    otp: string
  ): Promise<User | null> {
    const user = await this.userRepository.findById(id);
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

    const updatedUser = await this.userRepository.updateEmail(id, email);

    return updatedUser;
  }

  async updatePassword(id: string, password: string): Promise<User | null> {
    const isUserExist = await this.userRepository.findById(id);
    if (!isUserExist) {
      throw new UserNotFoundError();
    }

    const hashedPassword = await this.hashingAdapter.hash(password, 8);
    const user = await this.userRepository.updatePassword(id, hashedPassword);

    return user;
  }

  async searchUser(query: string, userId: string): Promise<User[]> {
    const users = await this.userRepository.searchUsersByQuery(query);

    return users.filter((user) => user._id !== userId);
  }
}
