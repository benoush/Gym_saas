import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { statutPaiement } from "../../enum/statutPaiement"
import { methodePaiement } from "../../enum/methodePaiement"


export interface PaiementAttributes {
    id: string;
    factureId: string;
    statut?: statutPaiement;
    methode: methodePaiement;
    num_transaction: string;
    createdAt?: Date;
    updatedAt?: Date
}

export interface PaiementCreationAttributes extends Optional<PaiementAttributes, "id" | "statut" | "createdAt" | "updatedAt"> { }

class Paiement extends Model<PaiementAttributes, PaiementCreationAttributes> implements PaiementAttributes {
    declare id: string;
    declare factureId: string;
    declare statut: statutPaiement;
    declare methode: methodePaiement;
    declare num_transaction: string;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
    declare static associate: (models: any) => void;

}

const initModelPaiement = (sequelize: Sequelize) => {
    Paiement.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            factureId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'factureId',
                references: {
                    model: 'factures',
                    key: 'id',
                }
            },
            statut: {
                type: DataTypes.ENUM(...Object.values(statutPaiement)),
                allowNull: false,
                defaultValue: statutPaiement.EN_ATTENTE
            },
            methode: {
                type: DataTypes.ENUM(...Object.values(methodePaiement)),
                allowNull: false
            },
            num_transaction: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Paiement",
            tableName: 'paiements',
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    )
}

Paiement.associate = (models: any) => {
    Paiement.belongsTo(models.Facture, { foreignKey: 'factureId', as: 'factures' });
};

export { Paiement, initModelPaiement };


