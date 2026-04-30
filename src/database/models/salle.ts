import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface SalleAttributes {
    id: string;
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
    Salle.hasOne(models.Staff, { foreignKey: 'staffId', as: 'staffs' });
    Salle.hasOne(models.Facture, { foreignKey: 'factureId', as: 'factures' });
    Salle.hasOne(models.PlanSalle, { foreignKey: 'planSalleId', as: 'planSalles' });
    Salle.belongsTo(models.Proprietaire, { foreignKey: 'proprietaireId', as: 'proprietaires' });
}

export { Salle, initModelSalle };


