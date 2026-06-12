import bcrypt from "bcryptjs";

/** Coût de hachage bcrypt commun à toute l'application. */
export const SALT_ROUNDS = 10;

/** Hache un mot de passe en clair. */
export const hashPassword = (plain: string): Promise<string> =>
  bcrypt.hash(plain, SALT_ROUNDS);

/** Compare un mot de passe en clair à son hash. */
export const comparePassword = (
  plain: string,
  hash: string
): Promise<boolean> => bcrypt.compare(plain, hash);
