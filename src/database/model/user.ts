import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

export interface AuthAttributes {
    id: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleteAt?: Date
}

export interface AuthCreationAttributes extends Optional<AuthAttributes,"id"|"createdAt"|"updatedAt"|"deleteAt">{}


export class User extends Model<AuthAttributes, AuthCreationAttributes> implements AuthAttributes{
  declare id: string;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt:  Date;
}

export const initModelAuth = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deleteAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};