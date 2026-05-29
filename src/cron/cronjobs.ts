import cron from "node-cron";
import { Op } from "sequelize";
import { AbonnementClient } from "../database/models/abonnementClient";
import { AbonnementProprietaire } from "../database/models/abonnementProprietaire";
import { StatutAbonnementEnum } from "../enum/statutAbonnementEnum";

const expirerAbonnements = async () => {
  const now = new Date();

  // ✅ Expirer abonnementClient
  const [nbClients] = await AbonnementClient.update(
    { statut: StatutAbonnementEnum.EXPIRE },
    {
      where: {
        statut: StatutAbonnementEnum.ACTIF,
        finAt: { [Op.lt]: now },
      },
    }
  );

  // ✅ Expirer abonnementProprietaire
  const [nbProprietaires] = await AbonnementProprietaire.update(
    { statut: StatutAbonnementEnum.EXPIRE },
    {
      where: {
        statut: StatutAbonnementEnum.ACTIF,
        finAt: { [Op.lt]: now },
      },
    }
  );

  console.log(
    `✅ [CRON] Expirés → ${nbClients} abonnementClient(s), ${nbProprietaires} abonnementProprietaire(s)`
  );
};

export const startCronJobs = () => {
  // Tous les jours à 00:00 (fuseau horaire Togo)
  cron.schedule(
    "0 0 * * *",
    async () => {
      console.log("⏰ [CRON] Vérification des abonnements expirés...");
      try {
        await expirerAbonnements();
      } catch (error) {
        console.error("❌ [CRON] Erreur expiration:", error);
      }
    },
    { timezone: "Africa/Lome" }
  );

  console.log("✅ Cron jobs démarrés (00:00 chaque jour - Africa/Lome)");
};