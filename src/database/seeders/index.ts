import { sequelize } from "../sequelize";
import { User } from "../models/user";
import { createEmptyContext } from "./context";
import { ADMIN_EMAIL, SEED_PASSWORD, log } from "./helpers";
import { seedPlans } from "./seedPlans";
import { seedUsersAndProfiles } from "./seedUsersAndProfiles";
import { seedSallesAndStaff } from "./seedSallesAndStaff";
import { seedAbonnements } from "./seedAbonnements";
import { seedFacturesPaiements } from "./seedFacturesPaiements";
import { seedNotifications } from "./seedNotifications";

export interface RunSeedersOptions {
  /** Recrée tout le schéma (DROP + CREATE) avant de seeder. DEV uniquement. */
  fresh?: boolean;
  /** Force le seed même si des données existent déjà (sans recréer le schéma). */
  force?: boolean;
}

/**
 * Exécute l'ensemble des seeders dans l'ordre des dépendances, à l'intérieur
 * d'une transaction unique (tout ou rien).
 *
 * Ordre : plans → users/profils → salles/staff → abonnements → factures/paiements → notifications.
 */
export const runSeeders = async (
  options: RunSeedersOptions = {}
): Promise<void> => {
  const { fresh = false, force = false } = options;

  await sequelize.authenticate();
  console.log("✅ Connexion à la base établie.");

  if (fresh) {
    console.log("♻️  Mode --fresh : recréation du schéma (DROP + CREATE)...");
    await sequelize.sync({ force: true });
  } else {
    // S'assure que les tables existent sans toucher aux données.
    await sequelize.sync();
  }

  // Garde d'idempotence : on ne re-seede pas une base déjà peuplée.
  const dejaSeede = await User.findOne({ where: { email: ADMIN_EMAIL } });
  if (dejaSeede && !fresh && !force) {
    console.log(
      "ℹ️  Base déjà seedée (admin présent). Utilisez --fresh (reset) ou --force pour réinsérer."
    );
    return;
  }

  console.log("🌱 Démarrage du seed...");
  const transaction = await sequelize.transaction();
  const ctx = createEmptyContext(transaction);

  try {
    await seedPlans(ctx);
    await seedUsersAndProfiles(ctx);
    await seedSallesAndStaff(ctx);
    await seedAbonnements(ctx);
    await seedFacturesPaiements(ctx);
    await seedNotifications(ctx);

    await transaction.commit();
    console.log("✅ Seed terminé avec succès.");
    log(`Comptes de connexion : mot de passe commun « ${SEED_PASSWORD} »`);
    log(`Admin : ${ADMIN_EMAIL}`);
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Échec du seed, transaction annulée :", error);
    throw error;
  }
};

/**
 * Point d'entrée CLI : `tsx src/database/seeders/index.ts [--fresh] [--force]`.
 */
const isDirectRun =
  process.argv[1] &&
  /seeders[\\/](index)\.(ts|js)$/.test(process.argv[1]);

if (isDirectRun) {
  const fresh = process.argv.includes("--fresh");
  const force = process.argv.includes("--force");

  runSeeders({ fresh, force })
    .then(() => sequelize.close())
    .then(() => process.exit(0))
    .catch(async (error) => {
      console.error(error);
      await sequelize.close().catch(() => undefined);
      process.exit(1);
    });
}
