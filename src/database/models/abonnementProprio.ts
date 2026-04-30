import { typeAbonnementSalle } from "enum/typeAbonnementSalle";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { typeAbonnementSaas } from "enum/typeAbonnementSaas";
import { StatutAbonnementEnum } from "enum/statutAbonnementEnum";

export interface AbonnementProprietaireAttributes {
    id: string;
    proprietaireId: string;
    type: string;
    statut: string;
    description: string;
    nbre_sceance: string;
    montant: string;
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
    declare nbre_sceance: string;
    declare montant: string;
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
                allowNull: false
            },
            statut: {
                type: DataTypes.ENUM(...Object.values(StatutAbonnementEnum)),
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nbre_sceance: {
                type: DataTypes.STRING,
                allowNull: false
            },
            montant: {
                type: DataTypes.STRING,
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
    AbonnementProprietaire.belongsTo(models.Proprietaire, { foreignKey: 'ProprietaireId', as: 'proprietaires' });
    AbonnementProprietaire.hasOne(models.Facture, { foreignKey: 'factureId', as: 'factures' });
}

export { AbonnementProprietaire, initModelAbonnementProprietaire };


