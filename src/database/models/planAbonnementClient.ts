import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { typePlanAbonnementClient } from "../../enum/typePlanAbonnementClient";

export interface PlanAbonnementClientAttributes {
    id: string;
    type: typePlanAbonnementClient;
    prix: number;
    createdAt?: Date;
    updatedAt?: Date;
    deleteAt?: Date
}

export interface PlanAbonnementClientCreationAttributes extends Optional<PlanAbonnementClientAttributes, "id" | "createdAt" | "updatedAt" | "deleteAt"> { }


export class PlanAbonnementClient extends Model<PlanAbonnementClientAttributes, PlanAbonnementClientCreationAttributes> implements PlanAbonnementClientAttributes {
    declare id: string;
    declare type: typePlanAbonnementClient;
    declare prix: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare deleteAt?: Date
  declare static associate: (models: any) => void;

}

export const initModelPlanAbonnementClient = (sequelize: Sequelize) => {
  PlanAbonnementClient.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(typePlanAbonnementClient)),
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
      modelName: "PlanAbonnementClient",
      tableName: "PlanAbonnementClients",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

PlanAbonnementClient.associate = (models: any) => {
  PlanAbonnementClient.hasMany(models.AbonnementClient, {
    foreignKey: 'planId',
    as: 'abonnementClients',
  });
}