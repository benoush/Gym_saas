
import { NotificationCreationAttributes } from "../../database/models/notification";
import { notificationType } from "../../enum/notificationType";
import { NotificationRepository } from "./notificationRepository";
import { NotificationIdAttribute } from "./notificationSchema";


export class NotificationService {
    private notificationRepository: NotificationRepository;

    constructor() {
        this.notificationRepository = new NotificationRepository();
    }
    async createNotification(NotificationRequest: NotificationCreationAttributes) {
        return await this.notificationRepository.createNotification(NotificationRequest);
    }
    async getNotificationById(id: string) {
        return await this.notificationRepository.getNotificationById(id);
    }
    async getNotificationPaginated(page: number, limit: number) {
        return await this.notificationRepository.getNotificationPaginated(page, limit);
    }
    async updateNotificationType(id: string, notification_type: notificationType) {
        return this.notificationRepository.updateNotificationType(id, notification_type);
    }
    async updateNotification(id: string, updatedData: Partial<NotificationIdAttribute>) {
        const data = await this.notificationRepository.getNotificationById(id);
        if (!data) {
            return null;
        }
        return await this.notificationRepository.updateNotification(id, updatedData);
    }
    async deleteNotification(id: string) {
        return await this.notificationRepository.deleteNotification(id);
    }
}