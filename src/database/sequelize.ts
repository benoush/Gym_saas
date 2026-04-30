import { Sequelize } from "sequelize";
import options from "../config/database";
import env from "../config/env";
import { initModelAbonnementClient } from "./models/abonnementClient";
import { initModelAbonnementProprietaire } from "./models/abonnementProprio";
import { initModelClient } from "./models/client";
import { initModelProprietaire } from "./models/proprietaire";
import { initModelPlanSalle } from "./models/plansalle";
import { initModelPlanSaas } from "./models/plansaas";
import { initModelFacture } from "./models/facture";
import { initModelNotif } from "./models/notification";
import { initModelPaiement } from "./models/paiement";
import { initModelSalle } from "./models/salle";
import { initModelStaff } from "./models/staff";
import { initModelUser } from "./models/user";



const sequelize = new Sequelize({
  ...options,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }

};

const syncDatabase = async (force: boolean = false, alter: boolean = true) => {
  if (env.NODE_ENV === "production") {
    console.warn(
      "Database synchronization is disabled in production environment.",
    );
    return;
  }

  try {
    await sequelize.sync({ force:true,});
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
  }
};

const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log("Database connection closed successfully.");
  } catch (error) {
    console.error("Unable to close the database connection:", error);
  }
};

const initModels = async () => {

  initModelUser(sequelize)
  initModelClient(sequelize)
  initModelAbonnementClient(sequelize)
  // initModelAbonnementProprietaire(sequelize)
  // initModelProprietaire(sequelize)
  // initModelPlanSalle(sequelize)
  // initModelPlanSaas(sequelize)
  // initModelFacture(sequelize)
  initModelNotif(sequelize)
  initModelPaiement(sequelize)
  // initModelSalle(sequelize)
  initModelStaff(sequelize)


  Object.values(sequelize.models).forEach((model: any) => {
    if (typeof model.associate === "function") {
      model.associate(sequelize.models);
    }
  })

};

initModels()
  .then(() => console.log("Models initialized successfully."))
  .catch((error) => console.error("Unable to initialize models:", error));

export { sequelize, testConnection, syncDatabase, closeConnection, initModels };


