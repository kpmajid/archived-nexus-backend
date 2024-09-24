import mongoose, { Model, Schema } from "mongoose";
import { Otp } from "../../domain/entities/Otp";

const otpSchema: Schema<Otp & Document> = new mongoose.Schema(
  {
    otp: String,
    email: String,
    type: {
      type: String,
      enum: ["verification", "passwordReset"],
      required: true,
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const OtpModel: Model<Otp & Document> = mongoose.model<Otp & Document>(
  "OTP",
  otpSchema
);
export default OtpModel;
