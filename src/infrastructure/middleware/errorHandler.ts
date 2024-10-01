import { NextFunction, Request, Response } from "express";
import { AppError } from "../../domain/errors/AppError";

import { sendErrorResponse } from "../../presentation/utils/responseHelper";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    console.error("Error details:", err);
    console.error("Stack trace:", err.stack);
  }

  if (err instanceof AppError) {
    sendErrorResponse(
      res,
      err.statusCode,
      err.message,
      err.name,
      !isProduction ? err : undefined
    );
  } else {
    const errorId =
      Date.now().toString(36) + Math.random().toString(36).substr(2);
    console.error(`Unhandled error (ID: ${errorId}):`, err);

    sendErrorResponse(
      res,
      500,
      "Internal server error",
      "InternalServerError",
      !isProduction ? { ...err, errorId } : { errorId }
    );
  }
};
