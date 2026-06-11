import { Model, Optional, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

export interface ProprietaireAttributes {
  id: string;
  userId: string;
  recto_carte_identite: string;
  verso_carte_identite: string;
  doc_justificatif: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date
}

export interface ProprietaireCreationAttributes extends Optional<ProprietaireAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt"> { }


export class Proprietaire extends Model<ProprietaireAttributes, ProprietaireCreationAttributes> implements ProprietaireAttributes {
  declare id: string;
  declare userId: string;
  declare recto_carte_identite: string;
  declare verso_carte_identite: string;
  declare doc_justificatif: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
  declare static associate: (models: any) => void;

}

export const initModelProprietaire = (sequelize: Sequelize) => {
  Proprietaire.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      recto_carte_identite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verso_carte_identite: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doc_justificatif: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Proprietaire",
      tableName: "proprietaires",
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

Proprietaire.associate = (models: any) => {
  Proprietaire.hasMany(models.Facture, { foreignKey: 'proprietaireId', as: 'factures' });
  Proprietaire.hasMany(models.Salle, { foreignKey: 'proprietaireId', as: 'salles' });
  Proprietaire.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
  Proprietaire.hasMany(models.AbonnementProprietaire, { foreignKey: 'proprietaireId', as: 'abonnementProprietaires' });
}