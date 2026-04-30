import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface FactureAttributes {
    id: string;
    clientId: string;
    proprietaireId: string;
    AbonnementClientId: string;
    AbonnementProprietaireId: string;
    salleId: string;
    montant: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FactureCreationAttributes extends Optional<FactureAttributes, "id" | "createdAt" | "updatedAt"> { }

class Facture extends Model<FactureAttributes, FactureCreationAttributes> implements FactureAttributes {
    declare id: string;
    declare clientId: string;
    declare proprietaireId: string;
    declare salleId: string;
    declare AbonnementClientId: string;
    declare AbonnementProprietaireId: string;
    declare montant: string;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
    declare static associate: (models: any) => void;
}

const initModelFacture = (sequelize: Sequelize) => {
    Facture.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            clientId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'client_id',
                references: {
                    model: 'clients',
                    key: 'id',
                }
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
            salleId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'salle_id',
                references: {
                    model: 'salles',
                    key: 'id',
                }
            },
            AbonnementClientId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'AbonnementClientId',
                references: {
                    model: 'abonnementClients',
                    key: 'id',
                }
            },
            AbonnementProprietaireId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'AbonnementProprietaireId',
                references: {
                    model: 'abonnementProprietaires',
                    key: 'id',
                }
            },
            montant: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Facture",
            tableName: 'factures',
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    )
}

Facture.associate = (models: any) => {
    Facture.belongsTo(models.Client, { foreignKey: 'clientId', as: 'clients' });
    Facture.belongsTo(models.Proprietaire, { foreignKey: 'proprietaireId', as: 'proprietaires' });
    Facture.belongsTo(models.AbonnementClient, { foreignKey: 'abonnementClientId', as: 'abonnementClients' });
    Facture.belongsTo(models.AbonnementProprietaire, { foreignKey: 'abonnementProprietaireId', as: 'abonnementProprietaires' });
    Facture.belongsTo(models.Salle, { foreignKey: 'salleId', as: 'salles' });
    Facture.hasMany(models.Paiement, { foreignKey: 'factureId', as: 'paiements' });

};

export { Facture, initModelFacture };


