import { RoleEnum } from "enum/roleEnum";
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: { userId: string; email: string, role: RoleEnum };
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}