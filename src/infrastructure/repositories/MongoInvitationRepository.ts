import { Invitation } from "../../domain/entities/Invitation";
import { IInvitationRepository } from "../../domain/interfaces/Repository/IInvitationRepository";

import { DatabaseOperationError } from "../../domain/errors/RepositoryErrors";

import InvitationModel from "../database/invitationModel";

export class MongoInvitationRepository implements IInvitationRepository {
  async create({
    project,
    inviter,
    invitee,
    email,
    token,
  }: Invitation): Promise<Invitation | null> {
    try {
      const invitation = new InvitationModel({});
      return invitation;
    } catch (error) {
      console.error("Error creating invitation:", error);
      throw new DatabaseOperationError("create inviation");
    }
  }

  findByToken(token: string): Promise<Invitation | null> {}

  updateStatus(id: string, status: "accepted" | "rejected"): Promise<void> {}
}
