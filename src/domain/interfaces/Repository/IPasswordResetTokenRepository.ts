import { ObjectId } from "mongoose";

export interface IPasswordResetTokenRepository {
  create(userId: string | ObjectId, token: string): Promise<void>;
  findByToken(
    token: string
  ): Promise<{ userId: string; createdAt: Date } | null>;
  deleteByUserId(userId: string): Promise<void>;
}
