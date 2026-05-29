import z from "zod";
import { TypeFacture } from "../../enum/typeFacture";

// ─── Schéma de création avec validation selon typeFacture ─────────────────────
export const createFactureSchema = z
  .object({
    typeFacture: z.nativeEnum(TypeFacture, {
      message: "typeFacture doit être CLIENT ou PROPRIETAIRE",
    }),
    montant: z.number().min(1, "Le montant est requis"),
    salleId: z.string().uuid("salleId doit être un UUID valide").optional(),

    // Champs CLIENT
    clientId: z.string().uuid("clientId doit être un UUID valide").optional(),
    abonnementClientId: z.string().uuid("abonnementClientId doit être un UUID valide").optional(),

    // Champs PROPRIETAIRE
    proprietaireId: z.string().uuid("proprietaireId doit être un UUID valide").optional(),
    abonnementProprietaireId: z.string().uuid("abonnementProprietaireId doit être un UUID valide").optional(),
  })
  // ✅ Validation conditionnelle selon typeFacture
  .refine(
    (data) => {
      if (data.typeFacture === TypeFacture.CLIENT) {
        return !!data.clientId && !!data.abonnementClientId;
      }
      return true;
    },
    {
      message: "clientId et abonnementClientId sont requis pour une facture CLIENT",
      path: ["clientId"],
    }
  )
  .refine(
    (data) => {
      if (data.typeFacture === TypeFacture.PROPRIETAIRE) {
        return !!data.proprietaireId && !!data.abonnementProprietaireId;
      }
      return true;
    },
    {
      message: "proprietaireId et abonnementProprietaireId sont requis pour une facture PROPRIETAIRE",
      path: ["proprietaireId"],
    }
  );

export const FactureIdSchema = z.object({
  id: z.string().uuid("id doit être un UUID valide"),
});

export const FacturePaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  typeFacture: z.nativeEnum(TypeFacture).optional(),
});

export type CreateFactureAttribute = z.infer<typeof createFactureSchema>;
export type FactureIdAttribute = z.infer<typeof FactureIdSchema>;
export type FacturePaginationAttribute = z.infer<typeof FacturePaginationSchema>;