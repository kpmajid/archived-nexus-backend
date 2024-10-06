import { NextFunction, Request, Response } from "express";

import { ProjectUseCase } from "../../application/useCase/ProjectUseCase";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { MongoProjectRepository } from "../../infrastructure/repositories/MongoProjectRepository";
import { MongoInvitationRepository } from "../../infrastructure/repositories/MongoInvitationRepository";
import { JWTService } from "../../infrastructure/service/JWTService";
import { BcryptHashingAdapter } from "../../infrastructure/adapters/BcryptHashingAdapter";
import { EmailTemplateService } from "../../infrastructure/service/EmailTemplateService";
import { NodemailerEmailService } from "../../infrastructure/service/NodemailerEmailService";
import { EmailService } from "../../application/services/EmailService";

export class ProjectController {
  private projectUseCase: ProjectUseCase;

  constructor() {
    const userRepository = new MongoUserRepository();
    const projectRepository = new MongoProjectRepository();
    const invitationRepository = new MongoInvitationRepository();
    // const notificationRepository=new MongoNotificationRepository()
    const jwtService = new JWTService();
    const hashingAdapter = new BcryptHashingAdapter();

    const emailTemplateService = new EmailTemplateService();

    const nodemailerEmailService = new NodemailerEmailService(
      emailTemplateService
    );

    const emailService = new EmailService(nodemailerEmailService);

    this.projectUseCase = new ProjectUseCase(
      userRepository,
      projectRepository,
      invitationRepository,
      // notificationRepository,
      jwtService,
      hashingAdapter,
      emailService
    );
  }

  public createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user } = res.locals;
      const id = user.id;

      const { title, description, startDate, endDate } = req.body;

      const project = await this.projectUseCase.createProject(
        id,
        title,
        description,
        startDate,
        endDate
      );

      res.status(200).send({
        message: "Project created successfully",
        project,
      });
    } catch (err) {
      next(err);
    }
  };

  public fetchProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user } = res.locals;
      const id = user.id;

      const projects = await this.projectUseCase.fetchProjects(id);

      res
        .status(200)
        .send({ message: "Fetched Projects successfully", projects });
    } catch (err) {
      next(err);
    }
  };

  public fetchProjectDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { user } = res.locals;
      const id = user.id;

      const projectId = req.params.id;

      const projectDetails = await this.projectUseCase.fetchProjectDetails(
        projectId
      );
      res.status(200).send({
        message: "Fetched Project details successfully",
        projectDetails,
      });
    } catch (err) {
      next(err);
    }
  };

  public editProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { user } = res.locals;
    const userId = user.id;
    const projectId = req.params.id;
    const { title, description, startDate, endDate } = req.body;

    const updatedProject = await this.projectUseCase.updateProjectDetails(
      userId,
      projectId,
      title,
      description,
      startDate,
      endDate
    );

    res.status(200).send({
      message: "Project updated successfully",
      project: updatedProject,
    });
  };

  public deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { user } = res.locals;
    const userId = user.id;

    const projectId = req.params.id;

    await this.projectUseCase.deleteProject(userId, projectId);
    res.status(200).send({
      message: "Project deleted successfully",
    });
  };

  public inviteUsersToProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { user } = res.locals;
    const inviterId = user.id;

    const { projectId, userIds } = req.body;

    await this.projectUseCase.inviteUsersToProject(
      inviterId,
      projectId,
      userIds
    );
    res.status(200).send({
      message: "Invited users successfully",
    });
  };
}
