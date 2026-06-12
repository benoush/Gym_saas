import { Router } from "express";
import * as authController from "./authController";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadAvatar } from "../../config/multer";

const router: Router = Router();

// ─── Routes publiques ────────────────────────────────────────────────────────
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// ─── Routes protégées (JWT requis) ──────────────────────────────────────────
router.get("/me", authMiddleware, authController.getMe);
router.patch(
  "/me",
  authMiddleware,
  uploadAvatar.single("photo"),
  authController.updateMe
);
router.post("/change-password", authMiddleware, authController.changePassword);
router.post("/logout-all", authMiddleware, authController.logoutAll);

export default router;
