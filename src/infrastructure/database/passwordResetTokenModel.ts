import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "1h" },
});

export const PasswordResetTokenModel = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema
);
