import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema } from "./authSchema";

const validBody = {
  nom: "Doe",
  prenom: "John",
  sexe: "Homme",
  tel: "+22890000001",
  email: "John.DOE@Gymsaas.com",
  password: "Secret123!",
};

describe("registerSchema", () => {
  it("accepte un corps valide", () => {
    const parsed = registerSchema.safeParse(validBody);
    expect(parsed.success).toBe(true);
  });

  it("normalise l'email (lowercase + trim)", () => {
    const parsed = registerSchema.safeParse({
      ...validBody,
      email: "  John.DOE@Gymsaas.com  ",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.email).toBe("john.doe@gymsaas.com");
    }
  });

  it("ignore tout champ `role` fourni (anti-escalade de privilège)", () => {
    const parsed = registerSchema.safeParse({ ...validBody, role: "ADMIN" });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      // Le schéma strippe `role` : impossible de s'auto-attribuer un rôle.
      expect((parsed.data as Record<string, unknown>).role).toBeUndefined();
    }
  });

  it("rejette un email invalide", () => {
    const parsed = registerSchema.safeParse({ ...validBody, email: "pas-un-email" });
    expect(parsed.success).toBe(false);
  });

  it("rejette un mot de passe trop court", () => {
    const parsed = registerSchema.safeParse({ ...validBody, password: "123" });
    expect(parsed.success).toBe(false);
  });

  it("rejette un sexe hors énumération", () => {
    const parsed = registerSchema.safeParse({ ...validBody, sexe: "X" });
    expect(parsed.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("normalise l'email et exige un mot de passe non vide", () => {
    const parsed = loginSchema.safeParse({ email: "  A@B.COM ", password: "x" });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.email).toBe("a@b.com");
  });

  it("rejette un mot de passe vide", () => {
    const parsed = loginSchema.safeParse({ email: "a@b.com", password: "" });
    expect(parsed.success).toBe(false);
  });
});
