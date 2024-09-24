import { ObjectId } from "mongoose";
import { IPasswordResetTokenRepository } from "../../domain/interfaces/Repository/IPasswordResetTokenRepository";
import { PasswordResetTokenModel } from "../database/passwordResetTokenModel";

export class MongoPasswordResetTokenRepository
  implements IPasswordResetTokenRepository
{
  async create(userId: string | ObjectId, token: string): Promise<void> {
    await PasswordResetTokenModel.create({ userId, token });
  }

  async findByToken(
    token: string
  ): Promise<{ userId: string; createdAt: Date } | null> {
    const tokenDoc = await PasswordResetTokenModel.findOne({ token });
    return tokenDoc
      ? { userId: tokenDoc.userId, createdAt: tokenDoc.createdAt }
      : null;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await PasswordResetTokenModel.deleteMany({ userId });
  }
}
