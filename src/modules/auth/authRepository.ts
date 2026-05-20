import { User } from "../../database/models/user";
import { RoleEnum } from "../../enum/roleEnum";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

export const createUser = async (email: string, password: string, role: RoleEnum) => {
  return User.create({ email, password, role });
};

export const findUserById = async (id: string) => {
  return User.findOne({ 
    where: { id },
    attributes: ["id", "email", "createdAt", "role"] 
  });
};