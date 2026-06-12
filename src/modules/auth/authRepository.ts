import { User, UserCreationAttributes } from "../../database/models/user";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

export const createUser = async (data: UserCreationAttributes) => {
  return User.create(data);
};

/** Projection publique (sans mot de passe ni secrets) — pour /me. */
export const findUserById = async (id: string) => {
  return User.findOne({
    where: { id },
    attributes: [
      "id",
      "email",
      "nom",
      "prenom",
      "tel",
      "sexe",
      "photo",
      "role",
      "createdAt",
    ],
  });
};

/** Instance complète (inclut mot de passe et champs reset) — pour usage interne. */
export const findFullUserById = async (id: string) => {
  return User.findByPk(id);
};

/** Retrouve un utilisateur par l'empreinte de son token de réinitialisation. */
export const findUserByResetTokenHash = async (tokenHash: string) => {
  return User.findOne({ where: { resetPasswordToken: tokenHash } });
};
