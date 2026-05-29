import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { TypeFacture } from "../../enum/typeFacture";

export interface FactureAttributes {
  id: string;
  typeFacture: TypeFacture;
  montant: number;
  salleId?: string | null;

  clientId?: string;
  abonnementClientId?: string;

  proprietaireId?: string;
  abonnementProprietaireId?: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface FactureCreationAttributes
  extends Optional<
    FactureAttributes,
    | "id"
    | "salleId"
    | "clientId"
    | "abonnementClientId"
    | "proprietaireId"
    | "abonnementProprietaireId"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

class Facture
  extends Model<FactureAttributes, FactureCreationAttributes>
  implements FactureAttributes
{
  declare id: string;
  declare typeFacture: TypeFacture;
  declare montant: number;
  declare salleId?: string | null;
  declare clientId?: string;
  declare abonnementClientId?: string;
  declare proprietaireId?: string;
  declare abonnementProprietaireId?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
  declare readonly deletedAt?: Date;

  declare static associate: (models: any) => void;
}

const initModelFacture = (sequelize: Sequelize) => {
  Facture.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      typeFacture: {
        type: DataTypes.ENUM(...Object.values(TypeFacture)),
        allowNull: false,
        field: "type_facture",
      },

      montant: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      salleId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "salles", key: "id" },
      },

      clientId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "clients", key: "id" },
      },

      abonnementClientId: {
        type: DataTypes.UUID,
        allowNull: true, 
        references: { model: "abonnementClients", key: "id" },
      },

      proprietaireId: {
        type: DataTypes.UUID,
        allowNull: true, 
        references: { model: "proprietaires", key: "id" },
      },

      abonnementProprietaireId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "abonnementProprietaires", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Facture",
      tableName: "factures",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

Facture.associate = (models: any) => {
  Facture.belongsTo(models.Salle, { foreignKey: "salleId", as: "salles" });
  Facture.belongsTo(models.Client, { foreignKey: "clientId", as: "clients" });
  Facture.belongsTo(models.Proprietaire, { foreignKey: "proprietaireId", as: "proprietaires" });
  Facture.belongsTo(models.AbonnementClient, { foreignKey: "abonnementClientId", as: "abonnementClients" });
  Facture.belongsTo(models.AbonnementProprietaire, { foreignKey: "abonnementProprietaireId", as: "abonnementProprietaires" });
  Facture.hasMany(models.Paiement, { foreignKey: "factureId", as: "paiements" });
};

export { Facture, initModelFacture };