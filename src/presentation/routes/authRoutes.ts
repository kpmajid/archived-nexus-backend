import { Router } from "express";

import { AuthController } from "../controllers/AuthController";

import { auth } from "../../infrastructure/middleware/authMiddleware";

const authController = new AuthController();

export const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/verify-otp", authController.verifyOTP);
authRoutes.post("/resend-otp", authController.resendOTP);

authRoutes.post("/login", authController.login);
authRoutes.get("/refresh-token", authController.refreshAccessToken);

authRoutes.post("/forgot-password", authController.initiatePasswodReset);
authRoutes.post("/reset-password", authController.resetPassword);

authRoutes.post("/logout", authController.logout);
