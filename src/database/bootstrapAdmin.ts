import { User } from "./models/user";
import { RoleEnum } from "../enum/roleEnum";
import { hashPassword } from "../common/auth/password";
import env from "../config/env";

/**
 * Provisionne le compte administrateur par défaut à partir des variables
 * d'environnement (`ADMIN_*`).
 *
 * Comportement (idempotent, sûr à exécuter à chaque démarrage) :
 *  - si aucun utilisateur ne porte `ADMIN_EMAIL` → création du compte ADMIN ;
 *  - s'il existe (même soft-deleted) → restauration, re-synchronisation du mot
 *    de passe depuis l'env et garantie du rôle ADMIN.
 *
 * Ainsi, un accès admin connu et piloté par la configuration est toujours
 * disponible, sans jamais dupliquer le compte.
 */
export const ensureDefaultAdmin = async (): Promise<void> => {
  const email = env.ADMIN_EMAIL.toLowerCase().trim();
  const hashedPassword = await hashPassword(env.ADMIN_PASSWORD);

  // `paranoid: false` pour retrouver un éventuel compte soft-deleted.
  const existing = await User.findOne({
    where: { email },
    paranoid: false,
  });

  if (!existing) {
    await User.create({
      email,
      password: hashedPassword,
      nom: env.ADMIN_NOM,
      prenom: env.ADMIN_PRENOM,
      tel: env.ADMIN_TEL,
      sexe: env.ADMIN_SEXE,
      role: RoleEnum.ADMIN,
    });
    console.log(`✅ Admin par défaut créé : ${email}`);
    return;
  }

  // Re-synchronise le mot de passe et garantit un compte ADMIN actif.
  existing.password = hashedPassword;
  existing.role = RoleEnum.ADMIN;
  if (existing.deletedAt) {
    await existing.restore();
  }
  await existing.save();
  console.log(`✅ Admin par défaut synchronisé : ${email}`);
};
