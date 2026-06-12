import jwt, { SignOptions } from "jsonwebtoken";
import env from "../../config/env";
import {
  findUserByEmail,
  createUser,
  findUserById,
  findFullUserById,
  findUserByResetTokenHash,
} from "./authRepository";
import {
  createRefreshToken,
  findRefreshTokenByHash,
  revokeRefreshTokenByHash,
  revokeAllRefreshTokensForUser,
} from "./refreshTokenRepository";
import {
  RegisterInput,
  LoginInput,
  ChangePasswordInput,
  ResetPasswordInput,
  UpdateProfileInput,
} from "./authSchema";
import { RoleEnum } from "../../enum/roleEnum";
import { JwtPayload } from "../../common/auth/auth.types";
import { hashPassword, comparePassword } from "../../common/auth/password";
import { generateOpaqueToken, hashToken } from "../../common/auth/tokens";
import { User } from "../../database/models/user";

/** Signe un access token JWT court à partir d'un utilisateur. */
const signAccessToken = (user: User): string => {
  const payload: JwtPayload = {
    userId: user.id as string,
    email: user.email,
    role: user.role as RoleEnum,
  };
  const signOptions: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
    algorithm: "HS256",
  };
  return jwt.sign(payload, env.JWT_SECRET, signOptions);
};

/**
 * Émet une paire access + refresh. Le refresh est un token opaque : sa valeur
 * brute est retournée au client, seule son empreinte SHA-256 est persistée.
 */
const issueTokens = async (
  user: User
): Promise<{ accessToken: string; refreshToken: string }> => {
  const accessToken = signAccessToken(user);

  const rawRefresh = generateOpaqueToken();
  const expiresAt = new Date(
    Date.now() + env.JWT_REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
  );
  await createRefreshToken(user.id as string, hashToken(rawRefresh), expiresAt);

  return { accessToken, refreshToken: rawRefresh };
};

/** Projection publique d'un utilisateur (jamais le mot de passe ni les secrets). */
const toPublicUser = (user: User) => ({
  id: user.id as string,
  email: user.email,
  nom: user.nom,
  prenom: user.prenom,
  tel: user.tel,
  sexe: user.sexe,
  photo: user.photo ?? null,
  role: user.role as RoleEnum,
  createdAt: user.createdAt as Date,
});

/**
 * Inscription publique : crée toujours un compte PROPRIETAIRE.
 * Le rôle n'est jamais dérivé du body (anti-escalade de privilège) ; la
 * création de CLIENT/STAFF/ADMIN passe par des endpoints protégés dédiés.
 */
export const register = async (data: RegisterInput) => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("Email déjà utilisé");

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser({
    nom: data.nom,
    prenom: data.prenom,
    sexe: data.sexe,
    tel: data.tel,
    email: data.email,
    password: hashedPassword,
    role: RoleEnum.PROPRIETAIRE,
  });

  const tokens = await issueTokens(user);
  return { ...tokens, user: toPublicUser(user) };
};

export const login = async (data: LoginInput) => {
  const user = await findUserByEmail(data.email);
  if (!user) throw new Error("Identifiants invalides");

  const isMatch = await comparePassword(data.password, user.password);
  if (!isMatch) throw new Error("Identifiants invalides");

  const tokens = await issueTokens(user);
  return { ...tokens, user: toPublicUser(user) };
};

/**
 * Rotation : valide le refresh token fourni, le révoque, et émet une nouvelle
 * paire. Un token inexistant/révoqué/expiré est rejeté.
 */
export const refresh = async (rawRefresh: string) => {
  const record = await findRefreshTokenByHash(hashToken(rawRefresh));
  if (!record) {
    throw new Error("Refresh token invalide ou expiré");
  }

  // Replay d'un token DÉJÀ révoqué → compromission probable : on coupe toutes
  // les sessions de l'utilisateur (RFC 6819, refresh token replay detection).
  if (record.revokedAt) {
    await revokeAllRefreshTokensForUser(record.userId);
    throw new Error("Refresh token invalide ou expiré");
  }

  if (record.expiresAt.getTime() < Date.now()) {
    throw new Error("Refresh token invalide ou expiré");
  }

  // Rotation ATOMIQUE : la révocation cible `revoked_at IS NULL` ; en cas de
  // course, une seule requête affecte la ligne. Si 0 ligne n'est affectée,
  // un autre appel a déjà fait tourner ce token → on traite comme un replay.
  const [affected] = await revokeRefreshTokenByHash(record.tokenHash);
  if (!affected) {
    await revokeAllRefreshTokensForUser(record.userId);
    throw new Error("Refresh token invalide ou expiré");
  }

  const user = await findFullUserById(record.userId);
  if (!user) throw new Error("Utilisateur introuvable");

  const tokens = await issueTokens(user);
  return { ...tokens, user: toPublicUser(user) };
};

/** Déconnexion : révoque le refresh token fourni (idempotent). */
export const logout = async (rawRefresh: string): Promise<void> => {
  await revokeRefreshTokenByHash(hashToken(rawRefresh));
};

/** Déconnexion globale : révoque toutes les sessions de l'utilisateur. */
export const logoutAll = async (userId: string): Promise<void> => {
  await revokeAllRefreshTokensForUser(userId);
};

/**
 * Change le mot de passe d'un utilisateur connecté après vérification de
 * l'ancien, puis révoque toutes ses sessions (re-login requis ailleurs).
 */
export const changePassword = async (
  userId: string,
  data: ChangePasswordInput
): Promise<void> => {
  const user = await findFullUserById(userId);
  if (!user) throw new Error("Utilisateur introuvable");

  const isMatch = await comparePassword(data.oldPassword, user.password);
  if (!isMatch) throw new Error("Ancien mot de passe incorrect");

  user.password = await hashPassword(data.newPassword);
  await user.save();

  await revokeAllRefreshTokensForUser(userId);
};

/**
 * Démarre une réinitialisation de mot de passe. Pour éviter l'énumération de
 * comptes, ne révèle jamais si l'email existe. En dev, retourne le token brut
 * (faute d'infra email) ; en production il devra être envoyé par email.
 */
export const forgotPassword = async (
  email: string
): Promise<{ resetToken?: string }> => {
  const user = await findUserByEmail(email);
  if (!user) return {};

  const rawToken = generateOpaqueToken();
  user.resetPasswordToken = hashToken(rawToken);
  user.resetPasswordExpires = new Date(
    Date.now() + env.PASSWORD_RESET_EXPIRES_MIN * 60 * 1000
  );
  await user.save();

  // En production, NE PAS exposer le token : il doit transiter par email.
  if (env.NODE_ENV === "production") return {};
  return { resetToken: rawToken };
};

/**
 * Finalise la réinitialisation : valide le token (existence + expiration),
 * met à jour le mot de passe, invalide le token et révoque les sessions.
 */
export const resetPassword = async (
  data: ResetPasswordInput
): Promise<void> => {
  const user = await findUserByResetTokenHash(hashToken(data.token));
  if (
    !user ||
    !user.resetPasswordExpires ||
    user.resetPasswordExpires.getTime() < Date.now()
  ) {
    throw new Error("Token invalide ou expiré");
  }

  user.password = await hashPassword(data.newPassword);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  await revokeAllRefreshTokensForUser(user.id as string);
};

export const getMe = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) throw new Error("Utilisateur introuvable");
  return toPublicUser(user);
};

/**
 * Met à jour le profil de l'utilisateur connecté. Champs autorisés uniquement :
 * nom, prénom, sexe, téléphone, photo. L'email, le rôle et le mot de passe ne
 * peuvent JAMAIS être modifiés via cet endpoint.
 */
export const updateProfile = async (
  userId: string,
  data: UpdateProfileInput,
  photo?: string | null
) => {
  const user = await findFullUserById(userId);
  if (!user) throw new Error("Utilisateur introuvable");

  if (data.nom !== undefined) user.nom = data.nom;
  if (data.prenom !== undefined) user.prenom = data.prenom;
  if (data.sexe !== undefined) user.sexe = data.sexe;
  if (data.tel !== undefined) user.tel = data.tel;
  if (photo) user.photo = photo;

  await user.save();
  return toPublicUser(user);
};
