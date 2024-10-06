import { Invitation } from "../../domain/entities/Invitation";
import { IInvitationRepository } from "../../domain/interfaces/Repository/IInvitationRepository";

import { DatabaseOperationError } from "../../domain/errors/RepositoryErrors";

import InvitationModel from "../database/invitationModel";

export class MongoInvitationRepository implements IInvitationRepository {
  async create(
    project: string,
    inviter: string,
    invitee: string,
    email: string,
    token: string
  ): Promise<void> {
    try {
      const invitation = new InvitationModel({
        project,
        inviter,
        invitee,
        email,
        token,
      });

      await invitation.save();
    } catch (error) {
      console.error("Error creating invitation:", error);
      throw new DatabaseOperationError("create inviation");
    }
  }

  async findByToken(token: string): Promise<Invitation | null> {
    return await InvitationModel.findOne({ token }).exec();
  }

  async updateStatus(
    id: string,
    status: "accepted" | "rejected"
  ): Promise<void> {
    await InvitationModel.updateOne({ _id: id }, { status });
  }
}
