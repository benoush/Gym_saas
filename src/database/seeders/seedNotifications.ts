import { Notification } from "../models/notification";
import { notificationType } from "../../enum/notificationType";
import { SeedContext } from "./context";
import { log } from "./helpers";

/**
 * Crée quelques notifications de bienvenue/rappel pour l'admin et les
 * utilisateurs liés aux profils créés (propriétaires + clients).
 */
export const seedNotifications = async (ctx: SeedContext): Promise<void> => {
  const { transaction } = ctx;

  const userIds: string[] = [];
  if (ctx.admin) userIds.push(ctx.admin.id);
  ctx.proprietaires.forEach((p) => userIds.push(p.userId));
  ctx.clients.forEach((c) => userIds.push(c.userId));

  let count = 0;
  for (const userId of userIds) {
    await Notification.bulkCreate(
      [
        {
          userId,
          notification_type: notificationType.INFO,
          content: "Bienvenue sur Gym SaaS 👋",
        },
        {
          userId,
          notification_type: notificationType.RAPPEL,
          content: "Pensez à compléter votre profil.",
        },
      ],
      { transaction }
    );
    count += 2;
  }

  log(`Notifications créées : ${count}`);
};
