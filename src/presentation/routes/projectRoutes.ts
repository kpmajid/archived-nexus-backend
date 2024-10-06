import { Router } from "express";
import { auth } from "../../infrastructure/middleware/authMiddleware";
import { ProjectController } from "../controllers/ProjectController";

const projectController = new ProjectController();

export const projectRoutes = Router();

projectRoutes.use(auth);

//createProject
projectRoutes.get("/", projectController.fetchProjects);

projectRoutes.post("/", projectController.createProject);

projectRoutes.get("/:id", projectController.fetchProjectDetails);

projectRoutes.put("/:id", projectController.editProject);

projectRoutes.delete("/:id", projectController.deleteProject);

projectRoutes.post("/invite",projectController.inviteUsersToProject)