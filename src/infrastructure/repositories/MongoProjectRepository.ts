import { Project } from "../../domain/entities/Project";
import { IProjectRepository } from "../../domain/interfaces/Repository/IProjectRepository";
import ProjectModel from "../database/projectModel";

export class MongoProjectRepository implements IProjectRepository {
  async create({
    teamLead,
    title,
    description,
    startDate,
    endDate,
  }: Project): Promise<Project> {
    const project = await ProjectModel.create({
      teamLead,
      title,
      description,
      startDate,
      endDate,
    });
    await project.save();

    return project;
  }

  async findProjectsByUserIdOrTeamMember(userId: string): Promise<Project[]> {
    const projects = await ProjectModel.find({
      $or: [{ teamLead: userId }, { teamMembers: userId }],
    })
      .populate("teamLead", "name email")
      .lean();
    return projects;
  }

  async findById(projectId: string): Promise<Project | null> {
    const project = await ProjectModel.findOne({ _id: projectId }).lean();

    return project;
  }

  async findByIdPopulated(projectId: string): Promise<Project | null> {
    const project = await ProjectModel.findOne({ _id: projectId })
      .populate("teamLead", "name email avatar")
      .populate("teamMembers", "name email avatar")
      .lean();

    return project;
  }

  async updateProjectDetails({
    _id,
    title,
    description,
    startDate,
    endDate,
  }: Project): Promise<Project | null> {
    const project = await ProjectModel.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        startDate,
        endDate,
      },
      { new: true }
    )
      .populate("teamLead", "name email avatar")
      .populate("teamMembers", "name email avatar")
      .lean();
    return project;
  }

  saveProject(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findProjects(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async deleteProject(projectId: string): Promise<void> {
    await ProjectModel.findByIdAndDelete(projectId);
  }
}
