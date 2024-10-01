import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { errorHandler } from "../middleware/errorHandler";
import { setupRoutes } from "./routes";

dotenv.config();

export class ExpressServer {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.initializeRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    const corsOptions = {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    };
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    setupRoutes(this.app);
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
