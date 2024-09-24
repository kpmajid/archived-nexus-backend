import { IImageUploadService } from "../../domain/interfaces/IImageUploadService";
import { ImageUploadError } from "../../domain/errors/ImageUploadError";

import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

import { Readable } from "stream";

export class CloudinaryService implements IImageUploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  private streamUpload(buffer: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) reject(error);
        else if (result) resolve(result);
        else reject(new Error("No result from Cloudinary"));
      });
      Readable.from(buffer).pipe(stream);
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const result = await this.streamUpload(file.buffer);
      return result.secure_url;
    } catch (error) {
      throw new ImageUploadError("Failed to upload image to Cloudinary");
    }
  }
}
