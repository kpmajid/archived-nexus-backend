import { Project } from "../../entities/Project";

export interface IProjectRepository {
  create({
    teamLead,
    title,
    description,
    startDate,
    endDate,
  }: Project): Promise<Project>;

  findProjectsByUserIdOrTeamMember(userId: string): Promise<Project[]>;
  findById(projectId: string): Promise<Project | null>;

  saveProject(): Promise<void>;
  findProjects(userId: string): Promise<void>;
}
