import { z } from "zod";

// Normalise l'email (trim + lowercase) AVANT la validation de format, afin que
// des espaces parasites ne provoquent pas d'échec et que le stockage soit
// cohérent avec la contrainte d'unicité.
const emailSchema = z.preprocess(
  (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
  z.email("Email invalide")
);

export const registerSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  prenom: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(100, "Le prénom ne peut pas dépasser 100 caractères"),
  sexe: z.enum(["Homme", "Femme", "Autre"], "Sexe invalide"),
  tel: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
    .max(15, "Le numéro de téléphone ne peut pas dépasser 15 chiffres"),
  email: emailSchema,
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  // NOTE : le rôle n'est volontairement PAS accepté depuis le body.
  // L'inscription publique crée toujours un PROPRIETAIRE (cf. authService).
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().nonempty("Le mot de passe est requis"),
});

const passwordField = z
  .string()
  .min(6, "Le mot de passe doit contenir au moins 6 caractères");

export const refreshSchema = z.object({
  refreshToken: z.string().nonempty("Le refresh token est requis"),
});

export const logoutSchema = z.object({
  refreshToken: z.string().nonempty("Le refresh token est requis"),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().nonempty("L'ancien mot de passe est requis"),
  newPassword: passwordField,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().nonempty("Le token est requis"),
  newPassword: passwordField,
});

export const updateProfileSchema = z
  .object({
    nom: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(100, "Le nom ne peut pas dépasser 100 caractères")
      .optional(),
    prenom: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(100, "Le prénom ne peut pas dépasser 100 caractères")
      .optional(),
    sexe: z.enum(["Homme", "Femme", "Autre"], "Sexe invalide").optional(),
    tel: z
      .string()
      .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
      .max(15, "Le numéro de téléphone ne peut pas dépasser 15 chiffres")
      .optional(),
  })
  // Empêche la mise à jour d'un profil vide.
  .refine((data) => Object.keys(data).length > 0, {
    message: "Au moins un champ doit être fourni",
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type LogoutInput = z.infer<typeof logoutSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
