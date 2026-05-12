import z from "zod";

const createFactureSchema = z.object({
    clientId: z.coerce.string("clientId must be a string"),
    proprietaireId: z.coerce.string("proprietaireId must be a string"),
    AbonnementClientId: z.coerce.string("AbonnementClientId must be a string"),
    AbonnementProprietaireId: z.coerce.string("AbonnementProprietaireId must be a string"),
    salleId: z.coerce.string("salleId must be a string"),
    montant: z.coerce.string("montant must be a string"),
});


const FactureIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const FacturePaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreateFactureAttribute = z.infer<typeof createFactureSchema>;
type FactureIdAttribute = z.infer<typeof FactureIdSchema>;
type FacturePaginationAttribute = z.infer<typeof FacturePaginationSchema>;

export {
  CreateFactureAttribute,
  FactureIdAttribute,
  FacturePaginationAttribute,
  createFactureSchema,
  FactureIdSchema,
  FacturePaginationSchema,
};