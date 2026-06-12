import { Op } from "sequelize";
import { RefreshToken } from "../../database/models/refreshToken";

export const createRefreshToken = async (
  userId: string,
  tokenHash: string,
  expiresAt: Date
) => {
  return RefreshToken.create({ userId, tokenHash, expiresAt });
};

export const findRefreshTokenByHash = async (tokenHash: string) => {
  return RefreshToken.findOne({ where: { tokenHash } });
};

/** Révoque un refresh token précis par son empreinte (idempotent). */
export const revokeRefreshTokenByHash = async (
  tokenHash: string,
  now: Date = new Date()
) => {
  return RefreshToken.update(
    { revokedAt: now },
    { where: { tokenHash, revokedAt: null as any } }
  );
};

/** Révoque toutes les sessions actives d'un utilisateur. */
export const revokeAllRefreshTokensForUser = async (
  userId: string,
  now: Date = new Date()
) => {
  return RefreshToken.update(
    { revokedAt: now },
    { where: { userId, revokedAt: null as any } }
  );
};

/** Purge les tokens expirés ou révoqués (maintenance). */
export const deleteExpiredRefreshTokens = async (now: Date = new Date()) => {
  return RefreshToken.destroy({
    where: {
      [Op.or]: [
        { expiresAt: { [Op.lt]: now } },
        { revokedAt: { [Op.ne]: null as any } },
      ],
    },
  });
};
