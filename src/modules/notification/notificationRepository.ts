import { Model, ModelStatic } from "sequelize";
import { Notification, NotificationCreationAttributes } from "../../database/models/notification";
import { NotFoundError } from "../../common/errors/index";
import { NotificationIdAttribute } from "./notificationSchema";
import { notificationType } from "../../enum/notificationType";

export class NotificationRepository {
    private notification: ModelStatic<Notification>

    constructor() {
        this.notification = Notification;
    }

    async createNotification(data: NotificationCreationAttributes) {
        return this.notification.create(data as Notification);
    }

    async getNotificationById(id: string) {
        return this.notification.findByPk(id);
    }


    async getNotificationPaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.notification.findAndCountAll({ offset, limit, });
    }

    async updateNotificationType(id: string, notification_type: notificationType) {
        const Notification = await this.notification.findByPk(id);
        if (!Notification) throw new NotFoundError("Notification");
            await Notification.update({ notification_type });
        return Notification;
   }

    async updateNotification(id: string, data: Partial<NotificationIdAttribute>) {
        const Notification = await this.getNotificationById(id);
        if (!Notification) {
            return null;
        }
        await Notification.update(data, {
            where: {
                id: data.id
            }
        });
        return Notification;
    }

    async deleteNotification(id: string) {
        const Notification = await this.getNotificationById(id);
        if (!Notification)
            throw new NotFoundError("Notification");

        await Notification.destroy();
        return true;
    }
}
