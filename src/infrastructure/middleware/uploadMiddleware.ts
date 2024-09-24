import multer from "multer";

import { Request } from "express";

import { InvalidFileTypeError } from "../../domain/errors/ImageUploadError";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new InvalidFileTypeError("Only image files are allowed!"));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

export const uploadSingleImage = upload.single("avatar");
