import { z } from "zod";
import { RoleEnum } from "../../enum/roleEnum";

export const registerSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").max(100, "Le prénom ne peut pas dépasser 100 caractères"),
  sexe: z.enum(["Homme", "Femme", "Autre"], "Sexe invalide"),
  tel: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres").max(15, "Le numéro de téléphone ne peut pas dépasser 15 chiffres"),
  email: z.email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.nativeEnum(RoleEnum).optional(),

});

export const loginSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().nonempty("Le mot de passe est requis"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;