import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { findUserByEmail, createUser, findUserById } from "./authRepository";
import { RegisterInput, LoginInput } from "./authSchema";
import { SignOptions } from "jsonwebtoken";
import { RoleEnum } from "../../enum/roleEnum";



export const register = async (data: RegisterInput) => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("Email déjà utilisé");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const role: RoleEnum = (data.role as RoleEnum) ?? RoleEnum.CLIENT;

  const user = await createUser(data.email, hashedPassword, role);

  return { 
    id: user.id as string, 
    email: user.email, 
    role: user.role 
  };
};

export const login = async (data: LoginInput): Promise<{ token: string }> => {
  const user = await findUserByEmail(data.email);
  if (!user) throw new Error("Identifiants invalides");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Identifiants invalides");

  const signOptions: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  const token = jwt.sign(
  { 
    userId: user.id as string, 
    email: user.email,
    role: user.role as RoleEnum
  },
  env.JWT_SECRET,
  signOptions
);
  return { token };
};

export const getMe = async (userId: string): Promise<{ id: string; email: string; createdAt: Date; role: RoleEnum }> => {
  const user = await findUserById(userId);
  if (!user) throw new Error("Utilisateur introuvable");

  return { 
    id: user.id as string, 
    email: user.email, 
    createdAt: user.createdAt as Date,
    role: user.role as RoleEnum
  };
};