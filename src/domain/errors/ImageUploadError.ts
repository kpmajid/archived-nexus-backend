import { AppError } from "./AppError";

export class ImageUploadError extends AppError {
  constructor(message: string = "Failed to upload image") {
    super(500, message);
    this.name = "ImageUploadError";
  }
}

export class InvalidFileTypeError extends AppError {
  constructor(message: string = "Only image files are allowed") {
    super(400, message);
    this.name = "InvalidFileTypeError";
  }
}
