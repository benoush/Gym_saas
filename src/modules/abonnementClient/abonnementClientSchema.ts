import z from "zod";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";
import { typeAbonnementSalle } from "../../enum/typeAbonnementSalle";
import { stat } from "node:fs";

const createAbonnementClientSchema = z.object({
    clientId: z.string().uuid("clientId must be a valid UUID"),
    type: z.nativeEnum(typeAbonnementSalle, {
        message: `Le type doit être l'un des suivants : ${Object.values(typeAbonnementSalle).join(", ")}`,
    }),
    statut: z.nativeEnum(StatutAbonnementEnum, {
        message: `Le statut doit être l'un des suivants : ${Object.values(StatutAbonnementEnum).join(", ")}`,
    }),
    description: z.string().max(255, "La description ne doit pas dépasser 255 caractères"),
    nbre_sceance: z.string().regex(/^\d+$/, "Le nombre de séances doit être un nombre entier"),
    montant: z.string().regex(/^\d+$/, "Le montant doit être un nombre entier"),
});


const AbonnementClientIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const updateAbonnementClientSchema = z.object({
  statut: z.nativeEnum(StatutAbonnementEnum, {
    message: `Le statut doit être l'un des suivants : ${Object.values(StatutAbonnementEnum).join(", ")}`,
   }),
});

const updateAbonnementClientDataSchema = z.object({
    type: z.nativeEnum(typeAbonnementSalle, {
        message: `Le type doit être l'un des suivants : ${Object.values(typeAbonnementSalle).join(", ")}`,
    }).optional(),
    description: z.string().max(255, "La description ne doit pas dépasser 255 caractères").optional(),
    nbre_sceance: z.number().min(0, "Le nombre de séances doit être un nombre entier positif").optional(),  
    montant: z.number().min(0, "Le montant doit être un nombre entier positif").optional(),
});

const AbonnementClientPaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreateAbonnementClientAttribute = z.infer<typeof createAbonnementClientSchema>;
type AbonnementClientIdAttribute = z.infer<typeof AbonnementClientIdSchema>;
type AbonnementClientPaginationAttribute = z.infer<typeof AbonnementClientPaginationSchema>;
type UpdateAbonnementClientAttribute = z.infer<typeof updateAbonnementClientSchema>;
type UpdateAbonnementClientDataAttribute = z.infer<typeof updateAbonnementClientDataSchema>;

export {
  CreateAbonnementClientAttribute,
  AbonnementClientIdAttribute,
  AbonnementClientPaginationAttribute,
  UpdateAbonnementClientAttribute,
  UpdateAbonnementClientDataAttribute,
  createAbonnementClientSchema,
  AbonnementClientIdSchema,
  updateAbonnementClientSchema,
  AbonnementClientPaginationSchema,
  updateAbonnementClientDataSchema,
};