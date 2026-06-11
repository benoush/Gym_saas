import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { typeAbonnementSalle } from "../../enum/typeAbonnementSalle"
import { StatutAbonnementEnum } from "../../enum/statutAbonnementEnum"


export interface AbonnementClientAttributes {
    id: string;
    clientId: string;
    salleId: string;
    planId: string;
    type: typeAbonnementSalle;
    statut: StatutAbonnementEnum;
    nbre_sceance: number;
    montant: number;
    createdAt?: Date;
    updatedAt?: Date;
    finAt?: Date;
    deletedAt?: Date;
}

export interface AbonnementClientCreationAttributes extends Optional<AbonnementClientAttributes, "id" | "createdAt" | "updatedAt" | "finAt" | "deletedAt"> { }

class AbonnementClient extends Model<AbonnementClientAttributes, AbonnementClientCreationAttributes> implements AbonnementClientAttributes {
    declare id: string;
    declare clientId: string;
    declare salleId: string;
    declare planId: string;
    declare type: typeAbonnementSalle;
    declare statut: StatutAbonnementEnum;
    declare nbre_sceance: number;
    declare montant: number;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
    declare readonly finAt?: Date;
    declare readonly deletedAt?: Date;
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
                references: {
                    model: 'clients',
                    key: 'id',
                }
            },
            salleId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'salles',
                    key: 'id',
                }
            },
            planId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'PlanAbonnementClients',
                    key: 'id',
                }
            },
            type: {
                type: DataTypes.ENUM(...Object.values(typeAbonnementSalle)),
                allowNull: false
            },
            statut: {
                type: DataTypes.ENUM(...Object.values(StatutAbonnementEnum)),
                allowNull: false,
                defaultValue: StatutAbonnementEnum.INNACTIF
            },
            // description: {
            //     type: DataTypes.STRING,
            //     allowNull: false
            // },
            nbre_sceance: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            montant: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            finAt: {
                type: DataTypes.DATE,
                allowNull: true
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
    AbonnementClient.belongsTo(models.Salle, { foreignKey: 'salleId', as: 'salles' });
    AbonnementClient.belongsTo(models.PlanAbonnementClient, { foreignKey: 'planId', as: 'planAbonnementClients' });
    AbonnementClient.hasMany(models.Facture, { foreignKey: 'abonnementClientId', as: 'factures' });
    
}

export { AbonnementClient, initModelAbonnementClient };


