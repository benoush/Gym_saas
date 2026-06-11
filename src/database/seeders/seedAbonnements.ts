import { AbonnementProprietaire } from "../models/abonnementProprietaire";
import { AbonnementClient } from "../models/abonnementClient";
import { typeAbonnementSaas } from "../../enum/typeAbonnementSaas";
import { typeAbonnementSalle } from "../../enum/typeAbonnementSalle";
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum";
import { SeedContext } from "./context";
import { addMonths, log } from "./helpers";

/**
 * Crée les abonnements actifs :
 *  - 1 abonnement SaaS par propriétaire (sur un plan propriétaire)
 *  - 1 abonnement par client (sur un plan client)
 * Les montants reprennent le prix du plan choisi.
 */
export const seedAbonnements = async (ctx: SeedContext): Promise<void> => {
  const { transaction, plansProprietaire, plansClient } = ctx;

  // ── Abonnements propriétaires ──────────────────────────────────────────────
  for (let i = 0; i < ctx.proprietaires.length; i++) {
    const proprietaire = ctx.proprietaires[i];
    // Alterne PRO / PREMIUM pour varier les données.
    const plan = plansProprietaire[i % plansProprietaire.length];

    const abonnement = await AbonnementProprietaire.create(
      {
        proprietaireId: proprietaire.id,
        planId: plan.id,
        type: typeAbonnementSaas.MENSUEL,
        statut: StatutAbonnementEnum.ACTIF,
        montant: plan.prix,
        finAt: addMonths(1),
      },
      { transaction }
    );
    ctx.abonnementsProprietaire.push(abonnement);
  }

  // ── Abonnements clients ────────────────────────────────────────────────────
  for (let i = 0; i < ctx.clients.length; i++) {
    const client = ctx.clients[i];
    const plan = plansClient[i % plansClient.length];
    // Chaque abonnement cible une salle (round-robin sur les salles seedées).
    const salle = ctx.salles[i % ctx.salles.length];

    const abonnement = await AbonnementClient.create(
      {
        clientId: client.id,
        salleId: salle.id,
        planId: plan.id,
        type: typeAbonnementSalle.MENSUEL,
        statut: StatutAbonnementEnum.ACTIF,
        nbre_sceance: 12,
        montant: plan.prix,
        finAt: addMonths(1),
      },
      { transaction }
    );
    ctx.abonnementsClient.push(abonnement);
  }

  log(
    `Abonnements créés : ${ctx.abonnementsProprietaire.length} propriétaire, ${ctx.abonnementsClient.length} client`
  );
};
