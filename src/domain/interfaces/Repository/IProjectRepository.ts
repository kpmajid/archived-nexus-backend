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
  
  findByIdPopulated(projectId: string): Promise<Project | null>;

  updateProjectDetails({
    _id,
    title,
    description,
    startDate,
    endDate,
  }: Project): Promise<Project | null>;

  saveProject(): Promise<void>;
  findProjects(userId: string): Promise<void>;

  deleteProject(projectId: string): Promise<void>;
}
