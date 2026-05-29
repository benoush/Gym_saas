import { typeAbonnementSalle } from "../../enum/typeAbonnementSalle";
import { typePlanAbonnementProprietaire } from "../../enum/typePlanAbonnementProprietaire";

// ─── Matrice des prix : plan + type → montant ─────────────────────────────────
// Format : PRIX_MATRIX[plan][type] = montant en FCFA (ou ta devise)
export const PRIX_MATRIX: Record<typePlanAbonnementProprietaire, Record<string, number>> = {
  [typePlanAbonnementProprietaire.BASIC]: {
    [typeAbonnementSalle.MENSUEL]:  5000,
    [typeAbonnementSalle.ANNUEL]:  50000, // ~2 mois offerts
  },
  [typePlanAbonnementProprietaire.PRO]: {
    [typeAbonnementSalle.MENSUEL]: 10000,
    [typeAbonnementSalle.ANNUEL]: 100000,
  },
  [typePlanAbonnementProprietaire.PREMIUM]: {
    [typeAbonnementSalle.MENSUEL]: 20000,
    [typeAbonnementSalle.ANNUEL]: 200000,
  },
};

// ─── Calculer le montant selon plan + type ────────────────────────────────────
export const getMontant = (
  plan: typePlanAbonnementProprietaire,
  type: string
): number => {
  const montant = PRIX_MATRIX[plan]?.[type];
  if (!montant) {
    throw new Error(
      `Combinaison invalide : plan=${plan}, type=${type}`
    );
  }
  return montant;
};

// ─── Calculer la date de fin selon le type ────────────────────────────────────
export const getDateFin = (
  debutAt: Date,
  type: string
): Date => {
  const fin = new Date(debutAt);
  switch (type) {
    case typeAbonnementSalle.MENSUEL:
      fin.setMonth(fin.getMonth() + 1);
      break;
    case typeAbonnementSalle.ANNUEL:
      fin.setFullYear(fin.getFullYear() + 1);
      break;
    default:
      throw new Error(`Type d'abonnement inconnu : ${type}`);
  }
  return fin;
};