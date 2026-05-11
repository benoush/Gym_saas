import z from "zod";

const createsalleSchema = z.object({
  proprietaireId: z.coerce.string("proprietaireId must be a string"),
  nom: z.string().min(2).max(100),
  contact: z.string().min(2).max(100),
  adresse: z.string().min(5).max(200),
  horaire: z.string().min(2).max(100),
});

const updatesalleSchema = z.object({
  proprietaireId: z.coerce.string("id must be a string"),
  nom: z.string().max(100),
  contact: z.string().max(100),
  adresse: z.string().max(200),
  horaire: z.string().max(100),
});

const salleIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const sallePaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreatesalleAttribute = z.infer<typeof createsalleSchema>; // contient maintenant tous les champs
type UpdatesalleAttribute = z.infer<typeof updatesalleSchema>;
type salleIdAttribute = z.infer<typeof salleIdSchema>;
type sallePaginationAttribute = z.infer<typeof sallePaginationSchema>;

export {
  CreatesalleAttribute,
  UpdatesalleAttribute,
  salleIdAttribute,
  sallePaginationAttribute,
  createsalleSchema,
  updatesalleSchema,
  salleIdSchema,
  sallePaginationSchema,
};