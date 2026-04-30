import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

export interface PlanSaasAttributes {
    id: string;
    type: string;
    prix: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleteAt?: Date
}

export interface PlanSaasCreationAttributes extends Optional<PlanSaasAttributes,"id"|"createdAt"|"updatedAt"|"deleteAt">{}


export class PlanSaas extends Model<PlanSaasAttributes, PlanSaasCreationAttributes> implements PlanSaasAttributes{
    declare id: string;
    declare type: string;
    declare prix: number;
    declare description: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deleteAt: Date;
}

export const initModelPlanSaas = (sequelize: Sequelize) => {
  PlanSaas.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prix: {
        type: DataTypes.STRING,
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
      modelName: "PlanSaas",
      tableName: "planSaas",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};