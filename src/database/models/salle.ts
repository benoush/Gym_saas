import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface SalleAttributes {
    id: string;
    proprietaireId: string;
    nom: string;
    contact: string;
    adresse: string
    horaire: string;
    createdAt?: Date;
    deleteAt?: Date;
}

export interface SalleCreationAttributes extends Optional<SalleAttributes, "id" | "createdAt" | "deleteAt"> { }

class Salle extends Model<SalleAttributes, SalleCreationAttributes> implements SalleAttributes {
    declare id: string;
    declare proprietaireId: string;
    declare nom: string;
    declare contact: string;
    declare adresse: string
    declare horaire: string;
    declare readonly createdAt?: Date;
    declare readonly deleteAt?: Date;

    declare static associate: (models: any) => void;
}

const initModelSalle = (sequelize: Sequelize) => {
    Salle.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            proprietaireId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'proprietaires',
                    key: 'id',
                }
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contact: {
                type: DataTypes.STRING,
                allowNull: false
            },
            adresse: {
                type: DataTypes.STRING,
                allowNull: false
            },
            horaire: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Salle",
            tableName: 'salles',
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    )
}


Salle.associate = (models: any) => {
    Salle.hasMany(models.Staff, { foreignKey: 'salleId', as: 'staffs' });
    Salle.hasMany(models.Facture, { foreignKey: 'salleId', as: 'factures' });
    Salle.hasMany(models.AbonnementClient, { foreignKey: 'salleId', as: 'abonnementClients' });
    Salle.belongsTo(models.Proprietaire, { foreignKey: 'proprietaireId', as: 'proprietaires' });
}

export { Salle, initModelSalle };


