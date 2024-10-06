import { Notification } from "../../domain/entities/Notification";
import { INotificationRepository } from "../../domain/interfaces/Repository/INotificationRepository";

import { DatabaseOperationError } from "../../domain/errors/RepositoryErrors";

import NotificationModel from "../database/notificationModel";

export class MongoNotificationRepository implements INotificationRepository {
  create(notification: Notification): Promise<Notification> {}
  findByUserId(userId: string): Promise<Notification[]> {}
  markAsRead(id: string): Promise<void> {}
}
