import { Router } from "express";
import { auth } from "../../infrastructure/middleware/authMiddleware";
import { ProjectController } from "../controllers/ProjectController";

const projectController = new ProjectController();

export const projectRoutes = Router();

projectRoutes.use(auth);

//createProject
projectRoutes.get("/", projectController.fetchProjects);

projectRoutes.post("/", projectController.createProject);

projectRoutes.get("/:id",projectController.fetchProjectDetails)