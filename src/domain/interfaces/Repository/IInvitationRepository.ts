import { Invitation } from "../../entities/Invitation";

export interface IInvitationRepository {
  create(
    project: string,
    inviter: string,
    invitee: string,
    email: string,
    token: string
  ): Promise<void>;
  findByToken(token: string): Promise<Invitation | null>;
  updateStatus(id: string, status: "accepted" | "rejected"): Promise<void>;
}
