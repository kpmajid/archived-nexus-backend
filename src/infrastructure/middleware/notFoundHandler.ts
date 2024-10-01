import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../../presentation/utils/responseHelper";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sendErrorResponse(res, 404, "Resource not found", "NOT_FOUND", {
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString(),
  });
};
