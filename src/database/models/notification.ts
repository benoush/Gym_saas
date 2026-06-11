import { DataTypes, EnumDataType, Model, Optional, Sequelize } from "sequelize";
import { notificationType } from "../../enum/notificationType"

export interface NotificationAttributes {
    id: string;
    userId: string;
    notification_type: notificationType;
    content: string;
    sentAt?: Date;
}

export interface NotificationCreationAttributes extends Optional<NotificationAttributes, "id" | "sentAt"> { }

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
    declare id: string;
    declare userId: string;
    declare notification_type: notificationType;
    declare content: string;
    declare readonly sentAt?: Date;
    declare static associate: (models: any) => void;

}

const initModelNotification = (sequelize: Sequelize) => {
    Notification.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
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

Notification.associate = (models: any) => {
    Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
};

export { Notification, initModelNotification };


