import { describe, it, expect } from "vitest";
import { generateOpaqueToken, hashToken } from "./tokens";

describe("tokens util", () => {
  it("génère un token hexadécimal de la longueur attendue (48 octets → 96 hex)", () => {
    const t = generateOpaqueToken();
    expect(t).toMatch(/^[a-f0-9]{96}$/);
  });

  it("génère des tokens uniques", () => {
    const a = generateOpaqueToken();
    const b = generateOpaqueToken();
    expect(a).not.toBe(b);
  });

  it("hashToken est déterministe et masque la valeur brute", () => {
    const raw = generateOpaqueToken();
    const h1 = hashToken(raw);
    const h2 = hashToken(raw);
    expect(h1).toBe(h2);
    expect(h1).not.toBe(raw);
    expect(h1).toMatch(/^[a-f0-9]{64}$/); // SHA-256
  });

  it("produit des empreintes différentes pour des entrées différentes", () => {
    expect(hashToken("a")).not.toBe(hashToken("b"));
  });
});
