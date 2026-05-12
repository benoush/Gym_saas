import { NotificationService } from "./notificationService";
import { NextFunction, Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { NotificationIdAttribute, CreateNotificationAttribute } from "./notificationSchema";

export class NotificationController {
    private notificationService: NotificationService;

    constructor() {
        this.notificationService = new NotificationService();
    }

    createNotification = async (req: Request, res: Response) => {
        const objectNotification = req.body;
        const data = await this.notificationService.createNotification(objectNotification);
        return sendSuccess(
            res,
            objectNotification,
            "Operation succesfull"
        )
    }

    getNotificationById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.notificationService.getNotificationById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getNotificationPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.notificationService.getNotificationPaginated(page, limit);
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

      updateNotificationType = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id as string;
        const { notification_type } = req.body;
        const data = await this.notificationService.updateNotificationType(id, notification_type);
        return sendSuccess(res, data, "Type de notification mis à jour avec succès", 200);
      } catch (error) {
        next(error);
      }
    };

    updateNotification = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<NotificationIdAttribute>;
        return res.send({
            data: await this.notificationService.updateNotification(id, data),
        })
    }

    deleteNotification = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.notificationService.deleteNotification(id),
    });
    }

}