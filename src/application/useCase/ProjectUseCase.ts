import { Project } from "../../domain/entities/Project";
import { Invitation } from "../../domain/entities/Invitation";

import { UserNotFoundError } from "../../domain/errors/AuthErrors";
import {
  FaildToUpdateProject,
  ProjectNotFoundError,
  YouAreNotTeamLead,
} from "../../domain/errors/ProjectError";
import { IProjectRepository } from "../../domain/interfaces/Repository/IProjectRepository";
import { IUserRepository } from "../../domain/interfaces/Repository/IUserRepository";
import { IInvitationRepository } from "../../domain/interfaces/Repository/IInvitationRepository";
import { INotificationRepository } from "../../domain/interfaces/Repository/INotificationRepository";

import { IJWTService } from "../../domain/interfaces/IJWTService";
import { IHashingAdapter } from "../../domain/interfaces/IHashingAdapter";

export class ProjectUseCase {
  constructor(
    private userRepository: IUserRepository,
    private projectRepository: IProjectRepository,
    private invitationRepository: IInvitationRepository,
    private notificationRepository: INotificationRepository,
    private jwtService: IJWTService,
    private hashingAdapter: IHashingAdapter
  ) {}

  private async isUserTeamLead(
    userId: string,
    projectId: string
  ): Promise<boolean> {
    const project = await this.projectRepository.findById(projectId);
    return project?.teamLead.toString() === userId;
  }

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
    const project = await this.projectRepository.findByIdPopulated(projectId);
    if (!project) {
      throw new ProjectNotFoundError();
    }

    return project;
  }

  async updateProjectDetails(
    userId: string,
    projectId: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date
  ): Promise<Project> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    // const teamLead = project.teamLead;
    // const isUserTeamLead = teamLead._id.toString() === userId;
    // if (!isUserTeamLead) {
    //   throw new YouAreNotTemaLead();
    // }

    const updatedProjectDetails =
      await this.projectRepository.updateProjectDetails({
        _id: projectId,
        title,
        description,
        startDate,
        endDate,
        teamLead: project.teamLead,
        teamMembers: project.teamMembers,
      });

    if (!updatedProjectDetails) {
      throw new FaildToUpdateProject();
    }

    return updatedProjectDetails;
  }

  async deleteProject(userId: string, projectId: string): Promise<void> {
    const project = await this.projectRepository.findById(projectId);
    console.log(project?.teamLead);

    // if (userId !== project?.teamLead?._id) {
    //   throw new YouAreNotTemaLead();
    // }

    await this.projectRepository.deleteProject(projectId);
  }

  async inviteUsersToProject(
    inviterId: string,
    projectId: string,
    userIds: string[]
  ): Promise<void> {
    const inviter = await this.userRepository.findById(inviterId);
    if (!inviter) {
      throw new UserNotFoundError();
    }

    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new ProjectNotFoundError();
    }

    if (project.teamLead.toString() !== inviterId) {
      throw new YouAreNotTeamLead();
    }

    for (const inviteeId in userIds) {
      const invitee = await this.userRepository.findById(inviteeId);

      if (!invitee) {
        continue;
      }

      const token = this.jwtService.generateInvitationToken(
        projectId,
        inviterId,
        inviteeId
      );

      const hashedToken = await this.hashingAdapter.hash(token, 8);

      const invitation: Invitation = {
        project: projectId,
        inviter: inviterId,
        invitee: inviteeId,
        email: invitee.email, // Assuming the user entity has an email property
        token: hashedToken,
        status: "pending",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set expiration to 24 hours from now
      };

      const invitation = this.invitationRepository.create(invitation);
    }
  }
}
