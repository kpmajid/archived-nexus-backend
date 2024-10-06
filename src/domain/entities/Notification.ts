import { ObjectId } from "mongoose";

export interface Notification {
  _id?: string;
  userId: string | ObjectId;
  type: "invitation" | "other";
  content: string;
  isRead: boolean;
  createdAt: Date;
}
