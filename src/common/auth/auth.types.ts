import { RoleEnum } from "enum/roleEnum";
import { Request } from "express";

/** Charge utile signée dans le JWT et restituée par le middleware d'auth. */
export interface JwtPayload {
  userId: string;
  email: string;
  role: RoleEnum;
}

/** Requête Express enrichie du user décodé depuis le JWT. */
export interface AuthRequest extends Request {
  user?: JwtPayload;
}
