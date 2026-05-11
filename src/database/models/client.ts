import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { statutClient } from "../../enum/statutClient";

export interface ClientAttributes {
  id: string;
  userId: string;
  statut: statutClient;
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, "id" | "statut" |"createdAt" | "updatedAt" | "deleteAt"> { }


class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  declare id: string;
  declare statut: statutClient;
  declare userId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deleteAt: Date;
  declare static associate: (models: any) => void;

}

const initModelClient = (sequelize: Sequelize) => {
  Client.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'userId',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      statut: {
        type: DataTypes.ENUM(...Object.values(statutClient)),
        allowNull: false,
        defaultValue: statutClient.Actif
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deleteAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Client",
      tableName: "clients",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

Client.associate = (models: any) => {
  Client.hasOne(models.AbonnementClient, { foreignKey: 'clientId', as: 'abonnementClients' });
  Client.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
}

export { Client, initModelClient }