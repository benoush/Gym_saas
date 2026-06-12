import bcrypt from "bcryptjs";
import env from "../../config/env";

/**
 * Email du compte administrateur seedé — aligné sur la variable d'environnement
 * `ADMIN_EMAIL` pour rester cohérent avec le bootstrap admin au démarrage.
 * Sert aussi de sentinelle d'idempotence.
 */
export const ADMIN_EMAIL = env.ADMIN_EMAIL.toLowerCase().trim();

/** Mot de passe en clair commun à tous les comptes seedés (DEV uniquement). */
export const SEED_PASSWORD = "Password123!";

/**
 * Hache un mot de passe en clair avec le même coût (10) que l'authService,
 * afin que les comptes seedés soient utilisables via /auth/login.
 */
export const hashPassword = (plain: string): Promise<string> =>
  bcrypt.hash(plain, 10);

/** Retourne une date décalée de `mois` mois par rapport à maintenant. */
export const addMonths = (mois: number, from: Date = new Date()): Date => {
  const d = new Date(from);
  d.setMonth(d.getMonth() + mois);
  return d;
};

/** Petit logger préfixé pour suivre l'avancement du seed. */
export const log = (message: string): void => {
  console.log(`  🌱 ${message}`);
};
