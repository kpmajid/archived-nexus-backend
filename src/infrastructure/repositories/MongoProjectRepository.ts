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
    console.log(projectId,"in fidnby id?");
    const project = await ProjectModel.findOne({ _id: projectId }).lean();

    return project;
  }

  saveProject(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findProjects(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}