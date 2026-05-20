import z from "zod";
import { createUserSchema } from "modules/user/userSchema";
import no from "zod/v4/locales/no.js";

const userProprietaireSchema = createUserSchema.omit({ role: true });
const createProprietaireSchema = z.object({
  // userId: z.coerce.string("userId must be a string"),
  recto_carte_identite: z.string(),
  verso_carte_identite: z.string(),
  doc_justificatif: z.string(),
}).extend(userProprietaireSchema.shape);

const updateProprietaireSchema = z.object({
  photo: z.string().optional(),
  recto_carte_identite: z.string().optional(),
  verso_carte_identite: z.string().optional(),
  doc_justificatif: z.string().optional(),
});

const proprietaireIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const proprietairePaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreateProprietaireAttribute = z.infer<typeof createProprietaireSchema>;
type UpdateProprietaireAttribute = z.infer<typeof updateProprietaireSchema>;
type ProprietaireIdAttribute = z.infer<typeof proprietaireIdSchema>;
type ProprietairePaginationAttribute = z.infer<typeof proprietairePaginationSchema>;

export {
  CreateProprietaireAttribute,
  UpdateProprietaireAttribute,
  ProprietaireIdAttribute,
  ProprietairePaginationAttribute,
  createProprietaireSchema,
  updateProprietaireSchema,
  proprietaireIdSchema,
  proprietairePaginationSchema,
};