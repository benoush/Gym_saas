import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { RoleEnum } from "../../enum/roleEnum"

export interface UserAttributes {
  id: string;
  photo: string;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  sexe: string;
  password: string;
  role: RoleEnum;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt"> { }


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare photo: string;
  declare nom: string;
  declare prenom: string;
  declare email: string;
  declare tel: string;
  declare sexe: string;
  declare password: string;
  declare role: RoleEnum;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;

  declare static associate: (models: any) => void;

}

const initModelUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sexe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(RoleEnum)),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
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

User.associate = (models: any) => {
  User.hasOne(models.Proprietaire, { foreignKey: 'proprioId', as: 'proprietaires' });
  User.hasOne(models.Client, { foreignKey: 'clientId', as: 'clients' });
  User.hasOne(models.Staff, { foreignKey: 'staffId', as: 'staffs' });
  User.hasMany(models.Notif, { foreignKey: 'notifId', as: 'notifications' });
}

export { User, initModelUser }