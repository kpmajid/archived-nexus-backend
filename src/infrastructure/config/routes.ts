import { Application, Router, Request, Response } from "express";
import { authRoutes } from "../../presentation/routes/authRoutes";
import { userRoutes } from "../../presentation/routes/userRoutes";
import { projectRoutes } from "../../presentation/routes/projectRoutes";

import { notFoundHandler } from "../middleware/notFoundHandler";

export const setupRoutes = (app: Application) => {
  const apiRouter = Router();

  // Mount individual route modules
  apiRouter.use("/auth", authRoutes);
  apiRouter.use("/users", userRoutes);
  apiRouter.use("/projects", projectRoutes);
  // apiRouter.use("/tasks", taskRoutes);

  // Mount the API router on the base path
  app.use("/api", apiRouter);

  app.use(notFoundHandler);
};
