import { Request, Response } from "express";
import * as authService from "./authService";
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "./authSchema";
import { AuthRequest } from "../../common/auth/auth.types";

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, errors: parsed.error.issues });
    }
    const result = await authService.register(parsed.data);
    return res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, errors: parsed.error.issues });
    }
    const result = await authService.login(parsed.data);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, errors: parsed.error.issues });
    }
    const result = await authService.refresh(parsed.data.refreshToken);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const parsed = logoutSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, errors: parsed.error.issues });
    }
    await authService.logout(parsed.data.refreshToken);
    return res
      .status(200)
      .json({ success: true, message: "Déconnexion réussie" });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const logoutAll = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Non authentifié" });
    }
    await authService.logoutAll(req.user.userId);
    return res
      .status(200)
      .json({ success: true, message: "Toutes les sessions ont été fermées" });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Non authentifié" });
    }
    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, errors: parsed.error.issues });
    }
    await authService.changePassword(req.user.userId, parsed.data);
    return res
      .status(200)
      .json({ success: true, message: "Mot de passe modifié" });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const parsed = forgotPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, errors: parsed.error.issues });
    }
    const result = await authService.forgotPassword(parsed.data.email);
    // Réponse générique (anti-énumération) ; resetToken présent en dev seulement.
    return res.status(200).json({
      success: true,
      message:
        "Si un compte existe pour cet email, un lien de réinitialisation a été envoyé",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const parsed = resetPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, errors: parsed.error.issues });
    }
    await authService.resetPassword(parsed.data);
    return res
      .status(200)
      .json({ success: true, message: "Mot de passe réinitialisé" });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Non authentifié" });
    }
    const result = await authService.getMe(req.user.userId);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res
      .status(404)
      .json({ success: false, message: error.message ?? "Utilisateur introuvable" });
  }
};

export const updateMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Non authentifié" });
    }
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, errors: parsed.error.issues });
    }
    const photo = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const result = await authService.updateProfile(
      req.user.userId,
      parsed.data,
      photo
    );
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
