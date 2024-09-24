import { AppError } from "./AppError";

export class ProjectNotFoundError extends AppError {
  constructor(message: string = "Project not found") {
    super(404, message);
  }
}

export class YouAreNotTemaLead extends AppError {
  constructor(message: string = "You are not the team lead") {
    super(403, message);
  }
}

export class FaildToUpdateProject extends AppError {
  constructor(message: string = "Failed to update project") {
    super(500, message);
  }
}
