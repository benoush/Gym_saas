import crypto from "crypto";

/**
 * Génère un token opaque à haute entropie (256+ bits) utilisé pour les refresh
 * tokens et les tokens de réinitialisation de mot de passe. La valeur brute est
 * remise au client ; seule son empreinte (cf. `hashToken`) est stockée.
 */
export const generateOpaqueToken = (bytes = 48): string =>
  crypto.randomBytes(bytes).toString("hex");

/**
 * Empreinte SHA-256 d'un token. Adaptée aux tokens à haute entropie (pas besoin
 * de bcrypt) : on ne stocke jamais la valeur brute en base.
 */
export const hashToken = (raw: string): string =>
  crypto.createHash("sha256").update(raw).digest("hex");
