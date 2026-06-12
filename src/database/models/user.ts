import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { RoleEnum } from "../../enum/roleEnum"

export interface UserAttributes {
  id: string;
  photo: string | null;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  sexe: string;
  password: string;
  role: RoleEnum;
  /** Hash SHA-256 du token de réinitialisation de mot de passe (jamais le token brut). */
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt" | 'photo' | 'resetPasswordToken' | 'resetPasswordExpires'> { }


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare photo: string | null;
  declare nom: string;
  declare prenom: string;
  declare email: string;
  declare tel: string;
  declare sexe: string;
  declare password: string;
  declare role: RoleEnum;
  declare resetPasswordToken: string | null;
  declare resetPasswordExpires: Date | null;
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
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
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
  User.hasOne(models.Proprietaire, { foreignKey: 'userId', as: 'proprietaires' });
  User.hasOne(models.Client, { foreignKey: 'userId', as: 'clients' });
  User.hasOne(models.Staff, { foreignKey: 'userId', as: 'staffs' });
  User.hasMany(models.Notification, { foreignKey: 'userId', as: 'notifications' });
  User.hasMany(models.RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
}

export { User, initModelUser }