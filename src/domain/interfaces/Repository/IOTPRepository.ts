import { Otp } from "../../entities/Otp";

export interface IOTPRepository {
  saveOtp(
    email: string,
    hashedOtp: string,
    type: "verification" | "passwordReset"
  ): Promise<void>;
  findOtpByEmail(
    email: string,
    type: "verification" | "passwordReset"
  ): Promise<Otp | null>;
  deleteOtp(
    email: string,
    type: "verification" | "passwordReset"
  ): Promise<void>;
}
