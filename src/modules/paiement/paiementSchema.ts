import z from "zod";
import { statutPaiement } from "../../enum/statutPaiement";
import { methodePaiement } from "../../enum/methodePaiement";

const createPaiementSchema = z.object({
    factureId: z.coerce.string("factureId must be a string"),
    statut: z.nativeEnum(statutPaiement, {
        error: `Le statut doit être l'un des suivants : ${Object.values(statutPaiement).join(", ")}`,
    }),
    methode: z.nativeEnum(methodePaiement, {
        error: `La méthode de paiement doit être l'une des suivantes : ${Object.values(methodePaiement).join(", ")}`,
    }),
    num_transaction: z.coerce.string("num_transaction must be a string"),});


const PaiementIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const updatePaiementStatutSchema = z.object({
  statut: z.nativeEnum(statutPaiement, {
    error: `Le statut doit être l'un des suivants : ${Object.values(statutPaiement).join(", ")}`,
  }),
});

const updatePaiementMethodeSchema = z.object({
  methode: z.nativeEnum(methodePaiement, {
    error: `La méthode de paiement doit être l'une des suivantes : ${Object.values(methodePaiement).join(", ")}`,
  }),
});

const PaiementPaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreatePaiementAttribute = z.infer<typeof createPaiementSchema>;
type PaiementIdAttribute = z.infer<typeof PaiementIdSchema>;
type PaiementPaginationAttribute = z.infer<typeof PaiementPaginationSchema>;
type UpdatePaiementStatutAttribute = z.infer<typeof updatePaiementStatutSchema>;
type UpdatePaiementMethodeAttribute = z.infer<typeof updatePaiementMethodeSchema>;

export {
  CreatePaiementAttribute,
  PaiementIdAttribute,
  PaiementPaginationAttribute,
  UpdatePaiementStatutAttribute,
    UpdatePaiementMethodeAttribute,
  createPaiementSchema,
  PaiementIdSchema,
  updatePaiementStatutSchema,
  PaiementPaginationSchema,
    updatePaiementMethodeSchema
};