import mongoose, { Document, Schema, Model } from "mongoose";
import { User } from "../../domain/entities/User";

const userSchema: Schema<User & Document> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    avatar:{
      type:String,
      default:null,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<User & Document> = mongoose.model<User & Document>(
  "User",
  userSchema
);
export default UserModel;
