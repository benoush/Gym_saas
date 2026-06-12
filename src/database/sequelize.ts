import { Sequelize } from "sequelize";
import options from "../config/database";
import env from "../config/env";
import { initModelAbonnementClient } from "./models/abonnementClient";
import { initModelAbonnementProprietaire } from "./models/abonnementProprietaire";
import { initModelClient } from "./models/client";
import { initModelProprietaire, Proprietaire } from "./models/proprietaire";
import { initModelPlanAbonnementClient } from "./models/planAbonnementClient";
import { initModelPlanAbonnementProprietaire } from "./models/planAbonnementProprietaire";
import { initModelFacture } from "./models/facture";
import { initModelNotification } from "./models/notification";
import { initModelPaiement } from "./models/paiement";
import { initModelSalle } from "./models/salle";
import { initModelStaff } from "./models/staff";
import { initModelUser, User } from "./models/user";
import { initModelRefreshToken } from "./models/refreshToken";



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
    await sequelize.sync({ force });
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
  initModelRefreshToken(sequelize)
  initModelProprietaire(sequelize)
  initModelSalle(sequelize)
  initModelClient(sequelize)
  initModelStaff(sequelize)
  initModelAbonnementClient(sequelize)
  initModelAbonnementProprietaire(sequelize)
  initModelPlanAbonnementClient(sequelize)
  initModelPlanAbonnementProprietaire(sequelize)
  initModelFacture(sequelize)
  initModelPaiement(sequelize)
  initModelNotification(sequelize)


  Object.values(sequelize.models).forEach((model: any) => {
    if (typeof model.associate === "function") {
      model.associate(sequelize.models);
    }
  })

};

initModels()
  .then(() => console.log("Models initialized successfully."))
  .catch((error) => console.error("Unable to initialize models:", error));

//   // associations
// User.hasMany(Proprietaire, { foreignKey: "userId" });
// Proprietaire.belongsTo(User, { foreignKey: "userId" });

export { sequelize, testConnection, syncDatabase, closeConnection, initModels };


