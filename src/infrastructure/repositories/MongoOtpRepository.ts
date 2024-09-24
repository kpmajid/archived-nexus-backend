import { Otp } from "../../domain/entities/Otp";
import { IOTPRepository } from "../../domain/interfaces/Repository/IOTPRepository";

import { DatabaseOperationError } from "../../domain/errors/RepositoryErrors";

import OtpModel from "../database/otpModel";

export class MongoOtpRepository implements IOTPRepository {
  async saveOtp(
    email: string,
    hashedOtp: string,
    type: "verification" | "passwordReset"
  ): Promise<void> {
    try {
      const otp = new OtpModel({ email, otp: hashedOtp, type });
      await otp.save();
    } catch (error) {
      console.error("Error saving otp:", error);
      throw new DatabaseOperationError("save otp");
    }
  }

  async findOtpByEmail(
    email: string,
    type: "verification" | "passwordReset"
  ): Promise<Otp | null> {
    try {
      const otp = await OtpModel.findOne({ email, type });
      return otp;
    } catch (error) {
      console.error("Error finding OTP by email:", error);
      throw new DatabaseOperationError("find OTP");
    }
  }

  async deleteOtp(
    email: string,
    type: "verification" | "passwordReset"
  ): Promise<void> {
    try {
      await OtpModel.deleteOne({ email, type });
    } catch (error) {
      console.error("Error deleting OTP:", error);
      throw new DatabaseOperationError("delete OTP");
    }
  }
}
