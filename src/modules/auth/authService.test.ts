import { describe, it, expect, vi, beforeEach } from "vitest";
import jwt from "jsonwebtoken";
import { RoleEnum } from "../../enum/roleEnum";
import env from "../../config/env";
import { hashPassword } from "../../common/auth/password";
import { hashToken } from "../../common/auth/tokens";

// Isolation : la base est entièrement mockée via les deux repositories.
vi.mock("./authRepository", () => ({
  findUserByEmail: vi.fn(),
  createUser: vi.fn(),
  findUserById: vi.fn(),
  findFullUserById: vi.fn(),
  findUserByResetTokenHash: vi.fn(),
}));

vi.mock("./refreshTokenRepository", () => ({
  createRefreshToken: vi.fn(),
  findRefreshTokenByHash: vi.fn(),
  revokeRefreshTokenByHash: vi.fn(),
  revokeAllRefreshTokensForUser: vi.fn(),
}));

import * as repo from "./authRepository";
import * as tokenRepo from "./refreshTokenRepository";
import * as authService from "./authService";

const baseInput = {
  nom: "Doe",
  prenom: "John",
  sexe: "Homme" as const,
  tel: "+22890000001",
  email: "john.doe@gymsaas.com",
  password: "Secret123!",
};

const fakeCreated = (attrs: Record<string, unknown>) => ({
  id: "user-uuid-1",
  createdAt: new Date("2026-01-01T00:00:00Z"),
  ...attrs,
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(tokenRepo.createRefreshToken).mockResolvedValue({} as any);
  vi.mocked(tokenRepo.revokeRefreshTokenByHash).mockResolvedValue([1] as any);
  vi.mocked(tokenRepo.revokeAllRefreshTokensForUser).mockResolvedValue([1] as any);
});

describe("authService.register", () => {
  it("force PROPRIETAIRE et émet access + refresh tokens", async () => {
    vi.mocked(repo.findUserByEmail).mockResolvedValue(null as any);
    vi.mocked(repo.createUser).mockImplementation(
      async (data: any) => fakeCreated(data) as any
    );

    const result = await authService.register(baseInput);

    const createArg = vi.mocked(repo.createUser).mock.calls[0][0];
    expect(createArg.role).toBe(RoleEnum.PROPRIETAIRE);
    expect(createArg.password).not.toBe(baseInput.password);

    // Le payload du access token reflète le rôle imposé.
    const decoded = jwt.verify(result.accessToken, env.JWT_SECRET) as any;
    expect(decoded.role).toBe(RoleEnum.PROPRIETAIRE);

    // Un refresh token opaque est retourné et stocké SOUS FORME DE HASH.
    expect(result.refreshToken).toMatch(/^[a-f0-9]{96}$/);
    expect(tokenRepo.createRefreshToken).toHaveBeenCalledTimes(1);
    const [userId, storedHash] = vi.mocked(tokenRepo.createRefreshToken).mock
      .calls[0];
    expect(userId).toBe("user-uuid-1");
    expect(storedHash).toBe(hashToken(result.refreshToken));
    expect(storedHash).not.toBe(result.refreshToken);

    expect((result.user as Record<string, unknown>).password).toBeUndefined();
  });

  it("rejette un email déjà utilisé", async () => {
    vi.mocked(repo.findUserByEmail).mockResolvedValue({ id: "x" } as any);
    await expect(authService.register(baseInput)).rejects.toThrow(
      "Email déjà utilisé"
    );
    expect(repo.createUser).not.toHaveBeenCalled();
  });
});

describe("authService.login", () => {
  it("renvoie access + refresh pour des identifiants corrects", async () => {
    const hash = await hashPassword("Secret123!");
    vi.mocked(repo.findUserByEmail).mockResolvedValue({
      id: "user-uuid-1",
      email: "john.doe@gymsaas.com",
      nom: "Doe",
      prenom: "John",
      tel: "+22890000001",
      sexe: "Homme",
      photo: null,
      role: RoleEnum.PROPRIETAIRE,
      password: hash,
      createdAt: new Date(),
    } as any);

    const result = await authService.login({
      email: "john.doe@gymsaas.com",
      password: "Secret123!",
    });

    const decoded = jwt.verify(result.accessToken, env.JWT_SECRET) as any;
    expect(decoded.email).toBe("john.doe@gymsaas.com");
    expect(result.refreshToken).toMatch(/^[a-f0-9]+$/);
  });

  it("rejette un mot de passe incorrect", async () => {
    const hash = await hashPassword("Secret123!");
    vi.mocked(repo.findUserByEmail).mockResolvedValue({
      id: "user-uuid-1",
      email: "john.doe@gymsaas.com",
      role: RoleEnum.PROPRIETAIRE,
      password: hash,
    } as any);

    await expect(
      authService.login({ email: "john.doe@gymsaas.com", password: "Faux" })
    ).rejects.toThrow("Identifiants invalides");
    expect(tokenRepo.createRefreshToken).not.toHaveBeenCalled();
  });

  it("rejette un utilisateur inexistant", async () => {
    vi.mocked(repo.findUserByEmail).mockResolvedValue(null as any);
    await expect(
      authService.login({ email: "ghost@gymsaas.com", password: "x" })
    ).rejects.toThrow("Identifiants invalides");
  });
});

describe("authService.refresh (rotation)", () => {
  const userRecord = {
    id: "user-uuid-1",
    email: "john.doe@gymsaas.com",
    role: RoleEnum.PROPRIETAIRE,
    nom: "Doe",
    prenom: "John",
    tel: "+22890000001",
    sexe: "Homme",
    photo: null,
    createdAt: new Date(),
  };

  it("révoque l'ancien token et en émet un nouveau", async () => {
    const raw = "a".repeat(96);
    vi.mocked(tokenRepo.findRefreshTokenByHash).mockResolvedValue({
      id: "rt-1",
      userId: "user-uuid-1",
      tokenHash: hashToken(raw),
      revokedAt: null,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    } as any);
    vi.mocked(repo.findFullUserById).mockResolvedValue(userRecord as any);

    const result = await authService.refresh(raw);

    // L'ancien token est révoqué (rotation).
    expect(tokenRepo.revokeRefreshTokenByHash).toHaveBeenCalledWith(
      hashToken(raw)
    );
    // Un nouveau couple est émis.
    expect(tokenRepo.createRefreshToken).toHaveBeenCalledTimes(1);
    expect(result.accessToken).toBeTruthy();
    expect(result.refreshToken).not.toBe(raw);
  });

  it("détecte un replay : un token révoqué rejoué coupe TOUTES les sessions", async () => {
    vi.mocked(tokenRepo.findRefreshTokenByHash).mockResolvedValue({
      userId: "user-uuid-1",
      tokenHash: "h",
      revokedAt: new Date(),
      expiresAt: new Date(Date.now() + 100000),
    } as any);
    await expect(authService.refresh("x")).rejects.toThrow(
      "Refresh token invalide ou expiré"
    );
    // Replay detection (C1) : révocation globale des sessions de l'utilisateur.
    expect(tokenRepo.revokeAllRefreshTokensForUser).toHaveBeenCalledWith(
      "user-uuid-1"
    );
    expect(tokenRepo.createRefreshToken).not.toHaveBeenCalled();
  });

  it("rotation atomique (C2) : si 0 ligne affectée (course), traite en replay", async () => {
    const raw = "d".repeat(96);
    vi.mocked(tokenRepo.findRefreshTokenByHash).mockResolvedValue({
      id: "rt-1",
      userId: "user-uuid-1",
      tokenHash: hashToken(raw),
      revokedAt: null,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    } as any);
    // Simule une course perdue : la révocation n'affecte aucune ligne.
    vi.mocked(tokenRepo.revokeRefreshTokenByHash).mockResolvedValue([0] as any);

    await expect(authService.refresh(raw)).rejects.toThrow(
      "Refresh token invalide ou expiré"
    );
    expect(tokenRepo.revokeAllRefreshTokensForUser).toHaveBeenCalledWith(
      "user-uuid-1"
    );
    expect(tokenRepo.createRefreshToken).not.toHaveBeenCalled();
  });

  it("rejette un token expiré", async () => {
    vi.mocked(tokenRepo.findRefreshTokenByHash).mockResolvedValue({
      userId: "user-uuid-1",
      tokenHash: "h",
      revokedAt: null,
      expiresAt: new Date(Date.now() - 1000),
    } as any);
    await expect(authService.refresh("x")).rejects.toThrow(
      "Refresh token invalide ou expiré"
    );
  });

  it("rejette un token inexistant", async () => {
    vi.mocked(tokenRepo.findRefreshTokenByHash).mockResolvedValue(null as any);
    await expect(authService.refresh("x")).rejects.toThrow(
      "Refresh token invalide ou expiré"
    );
  });
});

describe("authService.changePassword", () => {
  it("vérifie l'ancien mdp, le change et révoque toutes les sessions", async () => {
    const hash = await hashPassword("Ancien123!");
    const save = vi.fn().mockResolvedValue(undefined);
    const user: any = { id: "user-uuid-1", password: hash, save };
    vi.mocked(repo.findFullUserById).mockResolvedValue(user);

    await authService.changePassword("user-uuid-1", {
      oldPassword: "Ancien123!",
      newPassword: "Nouveau123!",
    });

    expect(user.password).not.toBe(hash);
    expect(save).toHaveBeenCalledTimes(1);
    expect(tokenRepo.revokeAllRefreshTokensForUser).toHaveBeenCalledWith(
      "user-uuid-1"
    );
  });

  it("rejette un ancien mot de passe incorrect", async () => {
    const hash = await hashPassword("Ancien123!");
    const save = vi.fn();
    vi.mocked(repo.findFullUserById).mockResolvedValue({
      id: "user-uuid-1",
      password: hash,
      save,
    } as any);

    await expect(
      authService.changePassword("user-uuid-1", {
        oldPassword: "Faux",
        newPassword: "Nouveau123!",
      })
    ).rejects.toThrow("Ancien mot de passe incorrect");
    expect(save).not.toHaveBeenCalled();
    expect(tokenRepo.revokeAllRefreshTokensForUser).not.toHaveBeenCalled();
  });
});

describe("authService.forgotPassword", () => {
  it("pose un token de reset haché et retourne le token brut en dev", async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const user: any = {
      id: "user-uuid-1",
      resetPasswordToken: null,
      resetPasswordExpires: null,
      save,
    };
    vi.mocked(repo.findUserByEmail).mockResolvedValue(user);

    const result = await authService.forgotPassword("john.doe@gymsaas.com");

    expect(result.resetToken).toBeTruthy();
    // Stocké haché, jamais en clair.
    expect(user.resetPasswordToken).toBe(hashToken(result.resetToken!));
    expect(user.resetPasswordExpires).toBeInstanceOf(Date);
    expect(save).toHaveBeenCalledTimes(1);
  });

  it("ne révèle pas l'inexistence d'un compte (pas d'erreur, pas de token)", async () => {
    vi.mocked(repo.findUserByEmail).mockResolvedValue(null as any);
    const result = await authService.forgotPassword("ghost@gymsaas.com");
    expect(result).toEqual({});
  });
});

describe("authService.resetPassword", () => {
  it("réinitialise le mdp, purge le token et révoque les sessions", async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const raw = "b".repeat(96);
    const user: any = {
      id: "user-uuid-1",
      password: "ancien",
      resetPasswordToken: hashToken(raw),
      resetPasswordExpires: new Date(Date.now() + 1000 * 60 * 30),
      save,
    };
    vi.mocked(repo.findUserByResetTokenHash).mockResolvedValue(user);

    await authService.resetPassword({ token: raw, newPassword: "Nouveau123!" });

    expect(user.password).not.toBe("ancien");
    expect(user.resetPasswordToken).toBeNull();
    expect(user.resetPasswordExpires).toBeNull();
    expect(save).toHaveBeenCalledTimes(1);
    expect(tokenRepo.revokeAllRefreshTokensForUser).toHaveBeenCalledWith(
      "user-uuid-1"
    );
  });

  it("rejette un token expiré", async () => {
    const raw = "c".repeat(96);
    vi.mocked(repo.findUserByResetTokenHash).mockResolvedValue({
      id: "user-uuid-1",
      resetPasswordToken: hashToken(raw),
      resetPasswordExpires: new Date(Date.now() - 1000),
      save: vi.fn(),
    } as any);

    await expect(
      authService.resetPassword({ token: raw, newPassword: "Nouveau123!" })
    ).rejects.toThrow("Token invalide ou expiré");
  });

  it("rejette un token inexistant", async () => {
    vi.mocked(repo.findUserByResetTokenHash).mockResolvedValue(null as any);
    await expect(
      authService.resetPassword({ token: "x", newPassword: "Nouveau123!" })
    ).rejects.toThrow("Token invalide ou expiré");
  });
});

describe("authService.updateProfile", () => {
  it("met à jour les champs autorisés et ignore les autres", async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const user: any = {
      id: "user-uuid-1",
      email: "john.doe@gymsaas.com",
      role: RoleEnum.PROPRIETAIRE,
      nom: "Doe",
      prenom: "John",
      tel: "+22890000001",
      sexe: "Homme",
      photo: null,
      password: "hash",
      createdAt: new Date(),
      save,
    };
    vi.mocked(repo.findFullUserById).mockResolvedValue(user);

    const result = await authService.updateProfile(
      "user-uuid-1",
      { nom: "Martin", tel: "+22899999999" } as any,
      "uploads/avatars/x.png"
    );

    expect(user.nom).toBe("Martin");
    expect(user.tel).toBe("+22899999999");
    expect(user.photo).toBe("uploads/avatars/x.png");
    // L'email et le rôle restent intacts.
    expect(user.email).toBe("john.doe@gymsaas.com");
    expect(user.role).toBe(RoleEnum.PROPRIETAIRE);
    // La projection publique n'expose pas le mot de passe.
    expect((result as Record<string, unknown>).password).toBeUndefined();
    expect(save).toHaveBeenCalledTimes(1);
  });
});
