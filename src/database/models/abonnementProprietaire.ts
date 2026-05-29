import { typeAbonnementSalle } from "enum/typeAbonnementSalle";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { typeAbonnementSaas } from "enum/typeAbonnementSaas";
import { StatutAbonnementEnum } from "enum/statutAbonnementEnum";

export interface AbonnementProprietaireAttributes {
    id: string;
    proprietaireId: string;
    planId: string;
    type: typeAbonnementSaas;
    statut: StatutAbonnementEnum;
    montant: number;
    createdAt?: Date;
    updatedAt?: Date;
    finAt?: Date;
    deleteAt?: Date;
}

export interface AbonnementProprietaireCreationAttributes extends Optional<AbonnementProprietaireAttributes, "id" | "createdAt" | "updatedAt" | "deleteAt"> { }

class AbonnementProprietaire extends Model<AbonnementProprietaireAttributes, AbonnementProprietaireCreationAttributes> implements AbonnementProprietaireAttributes {
    declare id: string;
    declare proprietaireId: string;
    declare planId: string;
    declare type: typeAbonnementSaas;
    declare statut: StatutAbonnementEnum;
    declare montant: number;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
    declare finAt?: Date;
    declare readonly deleteAt?: Date;
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
            planId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'planId',
                references: {
                    model: 'PlanAbonnementProprietaires',
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
                defaultValue: StatutAbonnementEnum.INNACTIF
            },
            montant: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            finAt: {
                type: DataTypes.DATE,
                allowNull: true
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
    AbonnementProprietaire.belongsTo(models.PlanAbonnementProprietaire, { foreignKey: 'planId', as: 'planAbonnementProprietaires' });
    AbonnementProprietaire.hasOne(models.Facture, { foreignKey: 'abonnementProprietaireId', as: 'factures' });
}

export { AbonnementProprietaire, initModelAbonnementProprietaire };


