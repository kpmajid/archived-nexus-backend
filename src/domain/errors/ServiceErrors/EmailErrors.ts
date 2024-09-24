import { AppError } from "../AppError";

export class EmailConfigurationError extends AppError {
  constructor(message: string = "Email configuration is incomplete") {
    super(500, message);
  }
}

export class EmailSendError extends AppError {
  constructor(message: string = "Failed to send email") {
    super(500, message);
  }
}
