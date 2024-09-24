import mongoose, { Document, Schema, Model } from "mongoose";
import { Project } from "../../domain/entities/Project";

const projectSchema: Schema<Project & Document> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: { type: String, default: "Pending" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    teamLead: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const ProjectModel: Model<Project & Document> = mongoose.model<
  Project & Document
>("Project", projectSchema);

export default ProjectModel;
