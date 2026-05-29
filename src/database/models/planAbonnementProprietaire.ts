import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { typePlanAbonnementProprietaire } from "../../enum/typePlanAbonnementProprietaire";
export interface PlanAbonnementProprietaireAttributes {
    id: string;
    type: typePlanAbonnementProprietaire;
    prix: number;
    createdAt?: Date;
    updatedAt?: Date;
    deleteAt?: Date
}

export interface PlanAbonnementProprietaireCreationAttributes extends Optional<PlanAbonnementProprietaireAttributes,"id"|"createdAt"|"updatedAt"|"deleteAt">{}


export class PlanAbonnementProprietaire extends Model<PlanAbonnementProprietaireAttributes, PlanAbonnementProprietaireCreationAttributes> implements PlanAbonnementProprietaireAttributes{
    declare id: string;
    declare type: typePlanAbonnementProprietaire;
    declare prix: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deleteAt: Date;
    declare static associate: (models: any) => void;
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

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deleteAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "PlanAbonnementProprietaire",
      tableName: "PlanAbonnementProprietaires",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

PlanAbonnementProprietaire.associate = (models: any) => {
  PlanAbonnementProprietaire.hasMany(models.AbonnementProprietaire, {
    foreignKey: "planId",
    as: "abonnementProprietaires",
  });
}