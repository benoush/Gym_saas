import { Request, Response } from "express";
import * as authService from "./authService";
import { registerSchema, loginSchema } from "./authSchema";
import { AuthRequest } from "../../common/auth/auth.types";


export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.issues });
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
      return res.status(400).json({ success: false, errors: parsed.error.issues });
    }
    const result = await authService.login(parsed.data);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const result = await authService.getMe(req.user!.userId);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(404).json({ success: false, message: "" });
  }
};