import z from "zod";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";
import { typeAbonnementSaas } from "../../enum/typeAbonnementSaas";

const createAbonnementProprietaireSchema = z.object({
    proprietaireId: z.string().uuid("ProprietaireId must be a valid UUID"),
    type: z.nativeEnum(typeAbonnementSaas, {
        message: `Le type doit être l'un des suivants : ${Object.values(typeAbonnementSaas).join(", ")}`,
    }),
    statut: z.nativeEnum(StatutAbonnementEnum, {
        message: `Le statut doit être l'un des suivants : ${Object.values(StatutAbonnementEnum).join(", ")}`,
    }).optional(),
    description: z.string().max(255, "La description ne doit pas dépasser 255 caractères"),
    nbre_sceance: z.number().min(0, "Le nombre de séances doit être un nombre entier positif"),
    montant: z.number().min(0, "Le montant doit être un nombre positif"),});


const AbonnementProprietaireIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const updateAbonnementProprietaireSchema = z.object({
  statut: z.nativeEnum(StatutAbonnementEnum, {
    message: `Le statut doit être l'un des suivants : ${Object.values(StatutAbonnementEnum).join(", ")}`,
   }),
});

const AbonnementProprietairePaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreateAbonnementProprietaireAttribute = z.infer<typeof createAbonnementProprietaireSchema>;
type AbonnementProprietaireIdAttribute = z.infer<typeof AbonnementProprietaireIdSchema>;
type AbonnementProprietairePaginationAttribute = z.infer<typeof AbonnementProprietairePaginationSchema>;
type UpdateAbonnementProprietaireAttribute = z.infer<typeof updateAbonnementProprietaireSchema>;

export {
  CreateAbonnementProprietaireAttribute,
  AbonnementProprietaireIdAttribute,
  AbonnementProprietairePaginationAttribute,
  UpdateAbonnementProprietaireAttribute,
  createAbonnementProprietaireSchema,
  AbonnementProprietaireIdSchema,
  updateAbonnementProprietaireSchema,
  AbonnementProprietairePaginationSchema,
};