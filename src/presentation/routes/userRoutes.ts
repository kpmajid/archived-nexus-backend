import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../../infrastructure/middleware/authMiddleware";

import { uploadSingleImage } from "../../infrastructure/middleware/uploadMiddleware";

const userController = new UserController();

export const userRoutes = Router();

userRoutes.use(auth);

userRoutes.get("/search", userController.searchUser);

userRoutes.get("/:id", userController.getUser);

userRoutes.put("/profile/name", userController.updateName);

userRoutes.post(
  "/profile/email/request-otp",
  userController.requestEmailChangeOTP
);
userRoutes.put("/profile/email", userController.updateEmail);

userRoutes.put(
  "/profile/avatar",
  uploadSingleImage,
  userController.updateAvatar
);

userRoutes.put("/profile/password", userController.updatePassword);
