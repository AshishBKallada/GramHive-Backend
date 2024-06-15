import { INotification } from "../../entities/notifications";

export interface INotificationInteractor {
    getNotifications(userId: string): Promise<INotification[]>
    updateNotifications(userId: string): Promise<boolean>
}