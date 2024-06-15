import { INotification } from "../../entities/notifications";

export interface INotificationRepository {
    addNotification(notification: INotification): Promise<boolean>;
    getUserNotifications(userId: string): Promise<INotification[]>;
    updateNotifications(userId: string): Promise<boolean>;
  }