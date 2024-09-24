import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class EmailPasswordRequiredError extends AppError {
  constructor(message: string = "Email and password are required") {
    super(400, message);
  }
}
export class TokenNewPasswordRequiredError extends AppError {
  constructor(message: string = "Token and new password are required") {
    super(400, message);
  }
}

//register

export class UserAlreadyExistsError extends AppError {
  constructor(message: string = "User already exists") {
    super(409, message);
  }
}

export class RegistrationFailedError extends AppError {
  constructor(message: string = "User registration failed. Please try again.") {
    super(500, message);
  }
}

//login
export class UserNotFoundError extends AppError {
  constructor(message: string = "User not found") {
    super(404, message);
  }
}

export class UnverifiedEmailError extends AppError {
  constructor(message: string = "Email is not verified") {
    super(401, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "User not verified") {
    super(401, message);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message: string) {
    super(401, message);
  }
}

export class LoginFailedError extends AppError {
  constructor(message: string = "User Login failed. Please try again.") {
    super(500, message);
  }
}

//verifyOTP
export class EmailOTPRequiredError extends AppError {
  constructor(message: string = "Email and OTP are required") {
    super(401, message);
  }
}

export class OtpNotFoundError extends AppError {
  constructor(message: string = "No OTP found for this email") {
    super(404, message);
  }
}

export class OtpExpiredError extends AppError {
  constructor(message: string = "OTP has expired") {
    super(410, message); // 410 Gone
  }
}

export class InvalidOtpError extends AppError {
  constructor(message: string = "Invalid OTP") {
    super(403, message); // 403 Forbidden
  }
}

export class OTPVertificationFailedError extends AppError {
  constructor(message: string = "User Login failed. Please try again.") {
    super(500, message);
  }
}

//resendOTP
export class EmailRequiredError extends AppError {
  constructor(message: string = "Email required") {
    super(400, message);
  }
}

export class OTPResendFailedError extends AppError {
  constructor(message: string = "User Login failed. Please try again.") {
    super(500, message);
  }
}

//authMiddleware
export class MissingAuthHeaderError extends AppError {
  constructor(message: string = "Authorization header is required") {
    super(401, message);
  }
}

export class MissingTokenError extends AppError {
  constructor(message: string = "Token is required") {
    super(401, message);
  }
}

export class InvalidTokenError extends AppError {
  constructor(message: string = "Token is not valid") {
    super(403, message);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(401, message);
  }
}

export class AccessTokenExpiredError extends AppError {
  constructor(message: string = "Token expired") {
    super(401, message);
  }
}

//refreshAccessToken

export class NoRefreshToken extends AppError {
  constructor(message: string = "Refresh token not found") {
    super(401, message);
  }
}
