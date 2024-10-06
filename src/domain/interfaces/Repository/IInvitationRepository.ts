import { Invitation } from "../../entities/Invitation";

export interface IInvitationRepository {
  create({
    project,
    inviter,
    invitee,
    email,
    token,
  }: Invitation): Promise<void>;
  findByToken(token: string): Promise<Invitation | null>;
  updateStatus(id: string, status: "accepted" | "rejected"): Promise<void>;
}
