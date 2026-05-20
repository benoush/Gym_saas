import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "config/env";
import { JwtPayload } from "../../common/auth/auth.types";

// Étendre le type Request pour inclure le user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// ─── Middleware d'authentification JWT ───────────────────────────────────────
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Token manquant ou invalide",
      },
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Token expiré ou invalide",
      },
    });
  }
};

// ─── Middleware de vérification des rôles ────────────────────────────────────
export const roleGuard = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Non authentifié",
        },
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: `Accès refusé. Rôles autorisés : ${roles.join(", ")}`,
        },
      });
      return;
    }

    next();
  };
};

// ─── Raccourcis par rôle ──────────────────────────────────────────────────────
export const isAdmin = roleGuard("ADMIN");
export const isProprietaire = roleGuard("PROPRIETAIRE");
export const isClient = roleGuard("CLIENT");
export const isStaff = roleGuard("STAFF");
export const isAdminOrProprietaire = roleGuard("ADMIN", "PROPRIETAIRE");
export const isAdminOrStaff = roleGuard("ADMIN", "STAFF");
export const isAnyRole = roleGuard("ADMIN", "PROPRIETAIRE", "CLIENT", "STAFF");