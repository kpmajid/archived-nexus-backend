import { AppError } from "./AppError";

export class ProjectNotFoundError extends AppError {
  constructor(message: string = "Project not found") {
    super(404, message);
  }
}
