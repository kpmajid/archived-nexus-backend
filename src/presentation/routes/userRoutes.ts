import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../../infrastructure/middleware/authMiddleware";

import { uploadSingleImage } from "../../infrastructure/middleware/uploadMiddleware";

const userController = new UserController();

export const userRoutes = Router();

userRoutes.use(auth);

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

// userRoutes.get("/users/profile");
// userRoutes.put("/users/profile");

// userRoutes.post("/users/password/reset"); //send email with reset link
// userRoutes.put("/users/password/reset/token"); //rset the password using a token received via email
// userRoutes.put("/users/password/update"); //update password from profile

// userRoutes.put("/users/profile/iamge");

// /api/users/search?email=example

userRoutes.get("/search", userController.searchUser);
