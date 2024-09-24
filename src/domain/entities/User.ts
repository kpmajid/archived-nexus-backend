import { ObjectId } from "mongoose";

export interface User {
  _id: string | ObjectId;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  refreshToken?: string;
  avatar: string;
}
