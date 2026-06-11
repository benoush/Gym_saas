import { PlanAbonnementProprietaire } from "../models/planAbonnementProprietaire";
import { PlanAbonnementClient } from "../models/planAbonnementClient";
import { typePlanAbonnementProprietaire } from "../../enum/typePlanAbonnementProprietaire";
import { typePlanAbonnementClient } from "../../enum/typePlanAbonnementClient";
import { SeedContext } from "./context";
import { log } from "./helpers";

/**
 * Catalogues de plans (globaux, non liés à une salle) :
 *  - Plans SaaS pour les propriétaires
 *  - Plans d'abonnement proposés aux clients
 */
export const seedPlans = async (ctx: SeedContext): Promise<void> => {
  const { transaction } = ctx;

  const plansProprietaireData = [
    { type: typePlanAbonnementProprietaire.BASIC, prix: 5000 },
    { type: typePlanAbonnementProprietaire.PRO, prix: 15000 },
    { type: typePlanAbonnementProprietaire.PREMIUM, prix: 30000 },
  ];

  const plansClientData = [
    { type: typePlanAbonnementClient.BASIC, prix: 10000 },
    { type: typePlanAbonnementClient.PRO, prix: 20000 },
    { type: typePlanAbonnementClient.PREMIUM, prix: 35000 },
  ];

  ctx.plansProprietaire = await PlanAbonnementProprietaire.bulkCreate(
    plansProprietaireData,
    { transaction }
  );
  ctx.plansClient = await PlanAbonnementClient.bulkCreate(plansClientData, {
    transaction,
  });

  log(
    `Plans créés : ${ctx.plansProprietaire.length} propriétaire, ${ctx.plansClient.length} client`
  );
};
