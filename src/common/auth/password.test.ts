import { describe, it, expect } from "vitest";
import { hashPassword, comparePassword, SALT_ROUNDS } from "./password";

describe("password util", () => {
  it("hache un mot de passe (le hash diffère du clair)", async () => {
    const hash = await hashPassword("Secret123!");
    expect(hash).not.toBe("Secret123!");
    expect(hash.length).toBeGreaterThan(20);
  });

  it("utilise le coût bcrypt configuré dans le préfixe du hash", async () => {
    const hash = await hashPassword("Secret123!");
    // Format bcrypt : $2b$<cost>$...
    expect(hash).toMatch(new RegExp(`^\\$2[aby]\\$${SALT_ROUNDS}\\$`));
  });

  it("valide un mot de passe correct", async () => {
    const hash = await hashPassword("Secret123!");
    expect(await comparePassword("Secret123!", hash)).toBe(true);
  });

  it("rejette un mot de passe incorrect", async () => {
    const hash = await hashPassword("Secret123!");
    expect(await comparePassword("MauvaisMdp", hash)).toBe(false);
  });
});
