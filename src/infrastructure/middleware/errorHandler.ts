import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/errors/AppError";

import { sendErrorResponse } from "../../presentation/utils/responseHelper";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error details:", err);
  console.error("Stack trace:", err.stack);

  if (err instanceof AppError) {
    sendErrorResponse(
      res,
      err.statusCode,
      err.message,
      err.name,
      process.env.NODE_ENV === "development" ? err : undefined
    );
  } else {
    sendErrorResponse(
      res,
      500,
      "Internal server error",
      "InternalServerError",
      process.env.NODE_ENV === "development" ? err : undefined
    );
  }
};
