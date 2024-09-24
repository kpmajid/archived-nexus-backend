import { AppError } from "./AppError";

export class DatabaseOperationError extends AppError {
  constructor(operation: string, message: string = `Failed to ${operation}`) {
    super(500, message);
  }
}
