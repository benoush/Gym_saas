import { DataTypes ,Model, Optional, Sequelize } from "sequelize";

export interface FactureAttributes {
    id: string;
    clientId:string;
    proprioId:string;
    Abonnement_clientId:string;
    Abonnement_proprioId:string;
    salleId:string;
    montant: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FactureCreationAttributes extends Optional<FactureAttributes,"id"|"createdAt"|"updatedAt">{}

class Facture extends Model<FactureAttributes, FactureCreationAttributes> implements FactureAttributes{
    declare id:string;
    declare clientId:string;
    declare proprioId:string;
    declare salleId:string;
    declare Abonnement_clientId:string;
    declare Abonnement_proprioId:string;
    declare montant:string;
    declare readonly createdAt?: Date ;
    declare readonly updatedAt?: Date ;
    declare static associate: (models: any) => void;
}

const initModelFacture = (sequelize:Sequelize)=>{
    Facture.init(
        {
            id:{
                type:DataTypes.UUID,
                defaultValue:DataTypes.UUIDV4,
                primaryKey:true
            },
            clientId:{
                type: DataTypes.UUID,
                allowNull: false,
                field: 'client_id',
                references: {
                    model: 'Client',
                    key: 'id',
                }    
            },
            proprioId:{
                type: DataTypes.UUID,
                allowNull: false,
                field: 'proprio_id',
                references: {
                    model: 'Proprietaire',
                    key: 'id',
                }    
            },
            salleId:{
                type: DataTypes.UUID,
                allowNull: false,
                field: 'salle_id',
                references: {
                    model: 'Salle',
                    key: 'id',
                }    
            },
            Abonnement_clientId:{
                type: DataTypes.UUID,
                allowNull: false,
                field: 'Abonnement_client_id',
                references: {
                    model: 'abonnement_client',
                    key: 'id',
                }    
            },
            Abonnement_proprioId:{
                type: DataTypes.UUID,
                allowNull: false,
                field: 'abon_proprio_id',
                references: {
                    model: 'abonnement_proprio',
                    key: 'id',
                }    
            },
            montant:{
                type:DataTypes.STRING,
                allowNull:false
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
    Facture.belongsTo(models.Client, { foreignKey: 'clientId', as: 'user' });
    Facture.belongsTo(models.Proprietaire, { foreignKey: 'proprioId', as: 'user' });
    Facture.belongsTo(models.AbonClient, { foreignKey: 'abonClientId', as: 'user' });
    Facture.belongsTo(models.AbonProprio, { foreignKey: 'abonProproId', as: 'abon' });
    Facture.belongsTo(models.Salle, { foreignKey: 'salleId', as: 'salle' });

};

export {Facture,initModelFacture};


