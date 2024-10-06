import { User } from "../../domain/entities/User";
import { DatabaseOperationError } from "../../domain/errors/RepositoryErrors";
import { IUserRepository } from "../../domain/interfaces/Repository/IUserRepository";

import UserModel from "../database/userModel";

export class MongoUserRepository implements IUserRepository {
  async create(newUser: User): Promise<User> {
    try {
      const user = await UserModel.create(newUser);
      await user.save();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new DatabaseOperationError("create user");
    }
  }

  async findById(userId: string): Promise<User | null> {
    try {
      const userExists = await UserModel.findOne({ _id: userId }).select(
        "-password"
      );
      return userExists;
    } catch (error) {
      console.error("Error finding user by id:", error);
      throw new DatabaseOperationError("find user");
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const userExists = await UserModel.findOne({ email: email });
      return userExists;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new DatabaseOperationError("find user");
    }
  }

  async verifyUser(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
      );
      return user;
    } catch (error) {
      console.error("Error verifying user:", error);
      throw new DatabaseOperationError("verify user");
    }
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<User | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { refreshToken },
        { new: true }
      );

      return user;
    } catch (error) {
      throw new DatabaseOperationError("Save refresh token");
    }
  }

  async invalidateRefreshToken(userId: string): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(
        userId,
        { refreshToken: null },
        { new: true }
      );
    } catch (error) {
      throw new DatabaseOperationError("invalidate Refresh Token");
    }
  }

  async updateName(id: string, name: string): Promise<User | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      ).select("-password -refreshToken");
      return user;
    } catch (error) {
      throw new DatabaseOperationError("update user name");
    }
  }

  async updateAvatar(id: string, avatar: string): Promise<User | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { avatar },
        { new: true }
      ).select("-password -refreshToken");
      return user;
    } catch (error) {
      throw new DatabaseOperationError("update user name");
    }
  }

  async updateEmail(id: string, email: string): Promise<User | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { email },
        { new: true }
      ).select("-password -refreshToken");
      return user;
    } catch (error) {
      throw new DatabaseOperationError("update user email");
    }
  }

  async updatePassword(
    userId: string,
    newPassword: string
  ): Promise<User | null> {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { password: newPassword },
        { new: true }
      ).select("-password -refreshToken");

      return user;
    } catch (error) {
      throw new DatabaseOperationError("update user email");
    }
  }

  async searchUsersByQuery(query: string): Promise<User[]> {
    try {
      return await UserModel.find({
        $or: [
          { email: { $regex: query, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
        ],
      })
        .select("email name")
        .exec();
    } catch (error) {
      console.log(error);
      throw new DatabaseOperationError("search for users");
    }
  }
}
