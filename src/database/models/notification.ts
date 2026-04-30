import { DataTypes, EnumDataType, Model, Optional, Sequelize } from "sequelize";
import { notificationType } from "../../enum/notificationType"

export interface NotifAttributes {
    id: string;
    userId: string;
    notification_type: string;
    content: string;
    sentAt?: Date;
}

export interface NotifCreationAttributes extends Optional<NotifAttributes, "id" | "sentAt"> { }

class Notif extends Model<NotifAttributes, NotifCreationAttributes> implements NotifAttributes {
    declare id: string;
    declare userId: string;
    declare notification_type: notificationType;
    declare content: string;
    declare readonly sentAt?: Date;
    declare static associate: (models: any) => void;

}

const initModelNotif = (sequelize: Sequelize) => {
    Notif.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'userId',
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
            notification_type: {
                type: DataTypes.ENUM(...Object.values(notificationType)),
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Notification",
            tableName: 'notifications',
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    )
}

Notif.associate = (models: any) => {
    Notif.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
};

export { Notif, initModelNotif };


