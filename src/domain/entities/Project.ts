import { ObjectId } from "mongoose";
import { User } from "./User";

export interface Project {
  _id?: string;
  title: string;
  description: string;
  status?: string;
  startDate: Date;
  endDate: Date;
  teamLead: string | ObjectId | User;
  teamMembers?: (string | ObjectId | User)[];
}
