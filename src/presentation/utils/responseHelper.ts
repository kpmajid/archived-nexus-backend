import { Response } from "express";
import {
  ApiResponse,
  createSuccessResponse,
  createErrorResponse,
} from "../../domain/models/ApiResponse";

export const sendResponse = (
  res: Response,
  statusCode: number,
  response: ApiResponse
): void => {
  res.status(statusCode).json(response);
};

export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
): void => {
  sendResponse(res, statusCode, createSuccessResponse(message, data));
};

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errorCode: string,
  error?: any
): void => {
  sendResponse(res, statusCode, createErrorResponse(message, errorCode, error));
};
