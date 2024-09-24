import { ObjectId } from "mongoose";
import { User } from "../../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  verifyUser(email: string): Promise<User | null>;
  saveRefreshToken(
    userId: string | ObjectId,
    refreshToken: string
  ): Promise<User | null>;
  invalidateRefreshToken(userId: string): Promise<void>;
  updateName(id: string, name: string): Promise<User | null>;
  updateAvatar(id: string, name: string): Promise<User | null>;
  updateEmail(id: string, email: string): Promise<User | null>;
  updatePassword(userId: string, newPassword: string): Promise<void>;
}
