import { Otp } from "../../entities/Otp";

export interface IOTPRepository {
  saveOtp(
    email: string,
    hashedOtp: string,
    type: "verification" 
  ): Promise<void>;
  findOtpByEmail(
    email: string,
    type: "verification" 
  ): Promise<Otp | null>;
  deleteOtp(
    email: string,
    type: "verification" 
  ): Promise<void>;
}
