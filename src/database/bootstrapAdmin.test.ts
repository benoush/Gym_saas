import { describe, it, expect, vi, beforeEach } from "vitest";
import { RoleEnum } from "../enum/roleEnum";
import { comparePassword } from "../common/auth/password";

// Mock du modèle Sequelize (aucune base réelle).
vi.mock("./models/user", () => ({
  User: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

// Mock des variables d'environnement admin.
vi.mock("../config/env", () => ({
  default: {
    ADMIN_EMAIL: "Admin@GymSaas.com",
    ADMIN_PASSWORD: "Admin123!",
    ADMIN_NOM: "Root",
    ADMIN_PRENOM: "Admin",
    ADMIN_TEL: "+22890000000",
    ADMIN_SEXE: "Autre",
  },
}));

import { User } from "./models/user";
import { ensureDefaultAdmin } from "./bootstrapAdmin";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ensureDefaultAdmin", () => {
  it("crée le compte admin (email normalisé, rôle ADMIN, mdp haché) s'il est absent", async () => {
    vi.mocked(User.findOne).mockResolvedValue(null as any);
    vi.mocked(User.create).mockResolvedValue({} as any);

    await ensureDefaultAdmin();

    expect(User.create).toHaveBeenCalledTimes(1);
    const arg = vi.mocked(User.create).mock.calls[0][0] as any;
    expect(arg.email).toBe("admin@gymsaas.com"); // lowercased + trim
    expect(arg.role).toBe(RoleEnum.ADMIN);
    expect(arg.password).not.toBe("Admin123!");
    // Le hash doit correspondre au mot de passe en clair de l'env.
    expect(await comparePassword("Admin123!", arg.password)).toBe(true);
  });

  it("recherche le compte même soft-deleted (paranoid: false)", async () => {
    vi.mocked(User.findOne).mockResolvedValue(null as any);
    vi.mocked(User.create).mockResolvedValue({} as any);

    await ensureDefaultAdmin();

    const findArg = vi.mocked(User.findOne).mock.calls[0][0] as any;
    expect(findArg.paranoid).toBe(false);
    expect(findArg.where.email).toBe("admin@gymsaas.com");
  });

  it("resynchronise le mot de passe et garantit le rôle ADMIN si le compte existe", async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const restore = vi.fn().mockResolvedValue(undefined);
    const existing: any = {
      password: "ancien-hash",
      role: RoleEnum.CLIENT,
      deletedAt: null,
      save,
      restore,
    };
    vi.mocked(User.findOne).mockResolvedValue(existing);

    await ensureDefaultAdmin();

    expect(User.create).not.toHaveBeenCalled();
    expect(existing.role).toBe(RoleEnum.ADMIN);
    expect(existing.password).not.toBe("ancien-hash");
    expect(await comparePassword("Admin123!", existing.password)).toBe(true);
    expect(restore).not.toHaveBeenCalled();
    expect(save).toHaveBeenCalledTimes(1);
  });

  it("restaure un compte admin soft-deleted avant de le sauvegarder", async () => {
    const save = vi.fn().mockResolvedValue(undefined);
    const restore = vi.fn().mockResolvedValue(undefined);
    const existing: any = {
      password: "ancien-hash",
      role: RoleEnum.ADMIN,
      deletedAt: new Date(),
      save,
      restore,
    };
    vi.mocked(User.findOne).mockResolvedValue(existing);

    await ensureDefaultAdmin();

    expect(restore).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledTimes(1);
  });
});
