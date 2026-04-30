import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { typeAbonnementSalle } from "../../enum/typeAbonnementSalle"
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum"


export interface AbonnementClientAttributes {
    id: string;
    clientId: string
    type: string;
    statut: string;
    description: string;
    nbre_sceance: string;
    montant: string;
    debutAt?: Date;
    finAt?: Date;
}

export interface AbonnementClientCreationAttributes extends Optional<AbonnementClientAttributes, "id" | "debutAt" | "finAt"> { }

class AbonnementClient extends Model<AbonnementClientAttributes, AbonnementClientCreationAttributes> implements AbonnementClientAttributes {
    declare id: string;
    declare clientId: string;
    declare type: typeAbonnementSalle;
    declare statut: StatutAbonnementEnum;
    declare description: string;
    declare nbre_sceance: string;
    declare montant: string;
    declare readonly debutAt?: Date;
    declare readonly finAt?: Date;
    declare static associate: (models: any) => void;

}

const initModelAbonnementClient = (sequelize: Sequelize) => {
    AbonnementClient.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            clientId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'clientId',
                references: {
                    model: 'clients',
                    key: 'id',
                }
            },
            type: {
                type: DataTypes.ENUM(...Object.values(typeAbonnementSalle)),
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
            modelName: "AbonnementClient",
            tableName: 'abonnementClients',
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    )
}

AbonnementClient.associate = (models: any) => {
    AbonnementClient.belongsTo(models.Client, { foreignKey: 'clientId', as: 'clients' });
    AbonnementClient.hasMany(models.Facture, { foreignKey: 'factureId', as: 'factures' });
}

export { AbonnementClient, initModelAbonnementClient };


