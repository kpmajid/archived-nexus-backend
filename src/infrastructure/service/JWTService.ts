import { IJWTService } from "../../domain/interfaces/IJWTService";
import {
  JWTPasswordResetTokenGenerationError,
  JWTRefreshSecretUndefinedError,
  JWTRefreshTokenGenerationError,
  JWTSecretUndefinedError,
  JWTTokenGenerationError,
} from "../../domain/errors/ServiceErrors/JWTErrors";

import jwt, { JwtPayload } from "jsonwebtoken";
import { InvalidTokenError } from "../../domain/errors/AuthErrors";

export class JWTService implements IJWTService {
  private accessSecret = process.env.JWT_SECRET_KEY || "your_access_secret";
  private refreshSecret =
    process.env.JWT_REFRESH_SECRET_KEY || "your_refresh_secret";

  generateAccessToken(userId: string, name: string, email: string): string {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new JWTSecretUndefinedError();
    }
    try {
      const token = jwt.sign({ userId, name, email }, secret, {
        expiresIn: "15m",
      });
      return token;
    } catch (error) {
      console.error("Error generating JWT:", error);
      throw new JWTTokenGenerationError();
    }
  }

  verifyAccessToken(token: string): string {
    try {
      const payload = jwt.verify(token, this.accessSecret) as JwtPayload;
      return payload.userId;
    } catch (error) {
      throw new InvalidTokenError("Invalid access token");
    }
  }

  generateRefreshToken(userId: string): string {
    const secret = process.env.JWT_REFRESH_SECRET_KEY;
    if (!secret) {
      throw new JWTRefreshSecretUndefinedError();
    }
    try {
      const token = jwt.sign({ userId }, secret, {
        expiresIn: "1d",
      });
      return token;
    } catch (error) {
      console.error("Error generating JWT:", error);
      throw new JWTRefreshTokenGenerationError();
    }
  }

  verifyRefreshToken(token: string): string {
    try {
      const payload = jwt.verify(token, this.refreshSecret) as JwtPayload;
      return payload.userId; // Return the user ID from the payload
    } catch (error) {
      throw new InvalidTokenError("Invalid refresh token");
    }
  }

  generatePasswordResetToken(userId: string): string {
    const secret = process.env.JWT_REFRESH_SECRET_KEY;
    if (!secret) {
      throw new JWTRefreshSecretUndefinedError();
    }
    try {
      const token = jwt.sign({ userId }, secret, {
        expiresIn: "5min",
      });
      return token;
    } catch (error) {
      console.error("Error generating JWT:", error);
      throw new JWTPasswordResetTokenGenerationError();
    }
  }
}
