import { Project } from "../../domain/entities/Project";
import { UserNotFoundError } from "../../domain/errors/AuthErrors";
import { ProjectNotFoundError } from "../../domain/errors/ProjectError";
import { IProjectRepository } from "../../domain/interfaces/Repository/IProjectRepository";
import { IUserRepository } from "../../domain/interfaces/Repository/IUserRepository";

export class ProjectUseCase {
  constructor(
    private userRepository: IUserRepository,
    private projectRepository: IProjectRepository
  ) {}

  async fetchProjects(userId: string): Promise<Project[]> {
    const projects =
      await this.projectRepository.findProjectsByUserIdOrTeamMember(userId);
    return projects;
  }

  async createProject(
    teamLead: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date
  ): Promise<Project> {
    const user = await this.userRepository.findById(teamLead);
    if (!user) {
      throw new UserNotFoundError();
    }

    const project = await this.projectRepository.create({
      teamLead,
      title,
      description,
      startDate,
      endDate,
    });

    return project;
  }

  async fetchProjectDetails(projectId: string): Promise<Project> {
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new ProjectNotFoundError();
    }
    return project;
  }
}
