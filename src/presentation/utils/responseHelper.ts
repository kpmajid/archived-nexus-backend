import { Response } from "express";
import {
  ApiResponse,
  createSuccessResponse,
  createErrorResponse,
} from "../../domain/models/ApiResponse";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  response: ApiResponse<T>
): void => {
  res.status(statusCode).json(response);
};

export const sendSuccessResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): void => {
  sendResponse<T>(res, statusCode, createSuccessResponse<T>(message, data));
};

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errorCode: string,
  error?: unknown
): void => {
  sendResponse(res, statusCode, createErrorResponse(message, errorCode, error));
};
