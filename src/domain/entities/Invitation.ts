import { ObjectId } from "mongoose";

export interface Invitation {
  _id?: string;
  project: string | ObjectId;
  inviter: string | ObjectId;
  invitee: string | ObjectId;
  email: string;
  token: string;
  status: "pending" | "accepted" | "rejected";
  expiresAt: Date;
}
