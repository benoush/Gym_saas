import { typeAbonnementSalle } from "enum/typeAbonnementSalle";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { typeAbonnementSaas } from "enum/typeAbonnementSaas";
import { StatutAbonnementEnum } from "enum/statutAbonnementEnum";

export interface AbonnementProprietaireAttributes {
    id: string;
    proprietaireId: string;
    type: typeAbonnementSaas;
    statut: StatutAbonnementEnum;
    description: string;
    nbre_sceance: number;
    montant: number;
    debutAt?: Date;
    finAt?: Date;
}

export interface AbonnementProprietaireCreationAttributes extends Optional<AbonnementProprietaireAttributes, "id" | "debutAt" | "finAt"> { }

class AbonnementProprietaire extends Model<AbonnementProprietaireAttributes, AbonnementProprietaireCreationAttributes> implements AbonnementProprietaireAttributes {
    declare id: string;
    declare proprietaireId: string;
    declare type: typeAbonnementSaas;
    declare statut: StatutAbonnementEnum;
    declare description: string;
    declare nbre_sceance: number;
    declare montant: number;
    declare readonly debutAt?: Date;
    declare readonly finAt?: Date;
    declare static associate: (models: any) => void;

}

const initModelAbonnementProprietaire = (sequelize: Sequelize) => {
    AbonnementProprietaire.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            proprietaireId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'proprietaireId',
                references: {
                    model: 'proprietaires',
                    key: 'id',
                }
            },
            type: {
                type: DataTypes.ENUM(...Object.values(typeAbonnementSaas)),
                allowNull: false,
            },
            statut: {
                type: DataTypes.ENUM(...Object.values(StatutAbonnementEnum)),
                allowNull: false,
                defaultValue: StatutAbonnementEnum.ACTIF
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nbre_sceance: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            montant: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "AbonnementProprietaire",
            tableName: 'abonnementProprietaires',
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    )
}

AbonnementProprietaire.associate = (models: any) => {
    AbonnementProprietaire.belongsTo(models.Proprietaire, { foreignKey: 'proprietaireId', as: 'proprietaires' });
    AbonnementProprietaire.hasOne(models.Facture, { foreignKey: 'abonnementProprietaireId', as: 'factures' });
}

export { AbonnementProprietaire, initModelAbonnementProprietaire };


