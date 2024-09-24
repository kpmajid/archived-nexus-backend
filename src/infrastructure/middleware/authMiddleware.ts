import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

import {
  MissingAuthHeaderError,
  MissingTokenError,
  UserNotFoundError,
  AccessTokenExpiredError,
} from "../../domain/errors/AuthErrors";
import UserModel from "../database/userModel";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secret = process.env.JWT_SECRET_KEY as string;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new MissingAuthHeaderError("You are not authent icated");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new MissingTokenError("You are not authenticated");
    }

    try {
      const decodedToken = jwt.verify(token, secret) as JwtPayload;

      const userId = decodedToken.userId;
      const user = await UserModel.findById(userId).select("-password");

      if (!user) {
        throw new UserNotFoundError();
      }

      res.locals.user = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      };

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AccessTokenExpiredError("Token has expired");
      }
      throw error;
    }
  } catch (err) {
    next(err);
  }
};
