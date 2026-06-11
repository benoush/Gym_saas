import { Transaction } from "sequelize";
import { User } from "../models/user";
import { Proprietaire } from "../models/proprietaire";
import { Salle } from "../models/salle";
import { Staff } from "../models/staff";
import { Client } from "../models/client";
import { PlanAbonnementProprietaire } from "../models/planAbonnementProprietaire";
import { PlanAbonnementClient } from "../models/planAbonnementClient";
import { AbonnementProprietaire } from "../models/abonnementProprietaire";
import { AbonnementClient } from "../models/abonnementClient";

/**
 * Contexte partagé entre les seeders : chaque étape renseigne les entités
 * qu'elle crée pour que les étapes suivantes puissent référencer leurs IDs.
 */
export interface SeedContext {
  transaction: Transaction;

  plansProprietaire: PlanAbonnementProprietaire[];
  plansClient: PlanAbonnementClient[];

  admin?: User;
  proprietaires: Proprietaire[];
  salles: Salle[];
  staffs: Staff[];
  clients: Client[];

  abonnementsProprietaire: AbonnementProprietaire[];
  abonnementsClient: AbonnementClient[];
}

export const createEmptyContext = (transaction: Transaction): SeedContext => ({
  transaction,
  plansProprietaire: [],
  plansClient: [],
  proprietaires: [],
  salles: [],
  staffs: [],
  clients: [],
  abonnementsProprietaire: [],
  abonnementsClient: [],
});
