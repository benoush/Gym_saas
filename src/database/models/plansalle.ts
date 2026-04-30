import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

export interface PlanSalleAttributes {
    id: string;
    salleId: string;
    type: string;
    prix: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleteAt?: Date
}

export interface PlanSalleCreationAttributes extends Optional<PlanSalleAttributes,"id"|"createdAt"|"updatedAt"|"deleteAt">{}


export class PlanSalle extends Model<PlanSalleAttributes, PlanSalleCreationAttributes> implements PlanSalleAttributes{
    declare id: string;
    declare salleId: string;
    declare type: string;
    declare prix: number;
    declare description: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare deleteAt: Date;
    declare static associate: (models: any) => void;

}

export const initModelPlanSalle = (sequelize: Sequelize) => {
  PlanSalle.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
      },
      salleId:{
                type: DataTypes.UUID,
                allowNull: false,
                field: 'salle_id',
                references: {
                    model: 'Salle',
                    key: 'id',
                }    
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
      modelName: "PlanSalle",
      tableName: "planSalles",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

PlanSalle.associate = (models: any) => {
  PlanSalle.belongsTo(models.Salle, {foreignKey: 'sallId', as: 'salle'});
}