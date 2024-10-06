import { ObjectId } from "mongoose";

export interface IJWTService {
  generateAccessToken(
    userId: string | ObjectId,
    name: string,
    email: string
  ): string;
  verifyAccessToken(token: string): string;

  generateRefreshToken(userId: string | ObjectId): string;
  verifyRefreshToken(token: string): string;

  generatePasswordResetToken(userId: string | ObjectId): string;

  generateInvitationToken(projectId: string, inviterId: string, inviteeId: string): string;
}
