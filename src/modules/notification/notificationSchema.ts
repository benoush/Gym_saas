import z from "zod";
import { notificationType } from "../../enum/notificationType";

const createNotificationSchema = z.object({
    userId: z.coerce.string("userId must be a string"),
    notification_type: z.nativeEnum(notificationType, {
        error: `Le type de notification doit être l'un des suivants : ${Object.values(notificationType).join(", ")}`,
    }),
    content: z.string("content must be a string")
});

const NotificationIdSchema = z.object({
  id: z.coerce.string("id must be a string"),
});

const updateNotificationTypeSchema = z.object({
  notification_type: z.nativeEnum(notificationType, {
    error: `Le type de notification doit être l'un des suivants : ${Object.values(notificationType).join(", ")}`,
  }),
});

const NotificationPaginationSchema = z.object({
  page: z.coerce.number("page must be a number"),
  limit: z.coerce.number("limit must be a number"),
});

type CreateNotificationAttribute = z.infer<typeof createNotificationSchema>;
type NotificationIdAttribute = z.infer<typeof NotificationIdSchema>;
type NotificationPaginationAttribute = z.infer<typeof NotificationPaginationSchema>;
type UpdateNotificationTypeAttribute = z.infer<typeof updateNotificationTypeSchema>;

export {
  CreateNotificationAttribute,
  NotificationIdAttribute,
  NotificationPaginationAttribute,
  UpdateNotificationTypeAttribute,
  createNotificationSchema,
  NotificationIdSchema,
  updateNotificationTypeSchema,
  NotificationPaginationSchema,
    
};