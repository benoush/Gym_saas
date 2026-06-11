import { Facture } from "../models/facture";
import { Paiement } from "../models/paiement";
import { TypeFacture } from "../../enum/typeFacture";
import { methodePaiement } from "../../enum/methodePaiement";
import { statutPaiement } from "../../enum/statutPaiement";
import { SeedContext } from "./context";
import { log } from "./helpers";

/**
 * Crée une facture par abonnement (propriétaire et client) puis un paiement
 * réglé (PAYE) pour chacune.
 */
export const seedFacturesPaiements = async (
  ctx: SeedContext
): Promise<void> => {
  const { transaction } = ctx;
  const methodes = Object.values(methodePaiement);
  let factureCount = 0;
  let paiementCount = 0;

  const reglerFacture = async (factureId: string, index: number) => {
    await Paiement.create(
      {
        factureId,
        statut: statutPaiement.PAYE,
        methode: methodes[index % methodes.length],
        num_transaction: `SEED-TX-${String(index + 1).padStart(4, "0")}`,
      },
      { transaction }
    );
    paiementCount++;
  };

  // ── Factures propriétaires (abonnement SaaS) ───────────────────────────────
  for (let i = 0; i < ctx.abonnementsProprietaire.length; i++) {
    const abonnement = ctx.abonnementsProprietaire[i];
    const facture = await Facture.create(
      {
        typeFacture: TypeFacture.PROPRIETAIRE,
        montant: abonnement.montant,
        proprietaireId: abonnement.proprietaireId,
        abonnementProprietaireId: abonnement.id,
      },
      { transaction }
    );
    factureCount++;
    await reglerFacture(facture.id, factureCount - 1);
  }

  // ── Factures clients (abonnement salle) ────────────────────────────────────
  for (let i = 0; i < ctx.abonnementsClient.length; i++) {
    const abonnement = ctx.abonnementsClient[i];
    const facture = await Facture.create(
      {
        typeFacture: TypeFacture.CLIENT,
        montant: abonnement.montant,
        clientId: abonnement.clientId,
        abonnementClientId: abonnement.id,
        // La facture reprend la salle de l'abonnement.
        salleId: abonnement.salleId,
      },
      { transaction }
    );
    factureCount++;
    await reglerFacture(facture.id, factureCount - 1);
  }

  log(`Factures créées : ${factureCount}, paiements : ${paiementCount}`);
};
