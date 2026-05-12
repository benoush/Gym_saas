import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { typePlanAbonnementProprietaire } from "../../enum/typePlanAbonnementProprietaire";
export interface PlanAbonnementProprietaireAttributes {
    id: string;
    type: typePlanAbonnementProprietaire;
    prix: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleteAt?: Date
}

export interface PlanAbonnementProprietaireCreationAttributes extends Optional<PlanAbonnementProprietaireAttributes,"id"|"createdAt"|"updatedAt"|"deleteAt">{}


export class PlanAbonnementProprietaire extends Model<PlanAbonnementProprietaireAttributes, PlanAbonnementProprietaireCreationAttributes> implements PlanAbonnementProprietaireAttributes{
    declare id: string;
    declare type: typePlanAbonnementProprietaire;
    declare prix: number;
    declare description: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deleteAt: Date;
}

export const initModelPlanAbonnementProprietaire = (sequelize: Sequelize) => {
  PlanAbonnementProprietaire.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(typePlanAbonnementProprietaire)),
        allowNull: false,
      },
      prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deleteAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "PlanAbonnementProprietaire",
      tableName: "PlanAbonnementProprietaire",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};