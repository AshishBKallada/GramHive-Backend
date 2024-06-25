import { INotification } from "../../entities/notifications";

export interface INotificationRepository {
    addNotification(notification: INotification): Promise<boolean>;
    getUserNotifications(userId: string,page:Number): Promise<INotification[]>;
    updateNotifications(userId: string): Promise<boolean>;
  }