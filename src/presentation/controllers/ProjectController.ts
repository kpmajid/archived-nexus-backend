import { NextFunction, Request, Response } from "express";

import { ProjectUseCase } from "../../application/useCase/ProjectUseCase";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { MongoProjectRepository } from "../../infrastructure/repositories/MongoProjectRepository";

export class ProjectController {
  private projectUseCase: ProjectUseCase;

  constructor() {
    const userRepository = new MongoUserRepository();
    const projectRepository = new MongoProjectRepository();

    this.projectUseCase = new ProjectUseCase(userRepository, projectRepository);
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

      const project = this.projectUseCase.createProject(
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
}
