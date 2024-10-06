import mongoose, { Document, Schema, Model } from "mongoose";
import { Invitation } from "../../domain/entities/Invitation";

const InvitationSchema: Schema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    inviter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    invitee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(+new Date() + 1 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

const InvitationModel: Model<Invitation & Document> = mongoose.model<
  Invitation & Document
>("Invitation", InvitationSchema);

export default InvitationModel;
