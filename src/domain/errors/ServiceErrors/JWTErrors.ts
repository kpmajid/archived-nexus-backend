import { AppError } from "../AppError";

export class JWTSecretUndefinedError extends AppError {
  constructor(message: string = "JWT secret key is not defined") {
    super(500, message);
  }
}

export class JWTTokenGenerationError extends AppError {
  constructor(message: string = "Failed to generate JWT token") {
    super(500, message);
  }
}

export class JWTRefreshSecretUndefinedError extends AppError {
  constructor(message: string = "JWT refresh secret key is not defined") {
    super(500, message);
  }
}

export class JWTRefreshTokenGenerationError extends AppError {
  constructor(message: string = "Failed to generate JWT token") {
    super(500, message);
  }
}
export class JWTPasswordResetTokenGenerationError extends AppError {
  constructor(message: string = "Failed to generate JWT token") {
    super(500, message);
  }
}

