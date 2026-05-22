import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { NotificationController } from "./notificationController";
import { NotificationPaginationSchema, createNotificationSchema, NotificationIdSchema } from "./notificationSchema";
import { updateNotificationTypeSchema } from "./notificationSchema";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware";

const router: Router = Router();
const notificationController = new NotificationController();



router.use(authMiddleware);
router.post("",isAdmin, validate(createNotificationSchema, "body"), notificationController.createNotification);
router.get("", validate(NotificationPaginationSchema, "query"), notificationController.getNotificationPaginated);
router.patch("/type/:id", isAdmin, validate(NotificationIdSchema, "params"), validate(updateNotificationTypeSchema, "body"), notificationController.updateNotificationType);
router.get("/:id", validate(NotificationIdSchema, "params"), notificationController.getNotificationById);
router.delete("/:id", isAdmin, validate(NotificationIdSchema, "params"), notificationController.deleteNotification);
router.patch("/:id", isAdmin, validate(NotificationIdSchema, "params"), validate(createNotificationSchema, "body"), notificationController.updateNotification);

export default router;