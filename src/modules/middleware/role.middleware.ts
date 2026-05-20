import { Response, NextFunction } from "express";
import { AuthRequest } from "../../common/auth/auth.types";
import { RoleEnum } from "../../enum/roleEnum"; 

export const authorize = (...allowedRoles: RoleEnum[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};