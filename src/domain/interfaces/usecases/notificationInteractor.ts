import { INotification } from "../../entities/notifications";

export interface INotificationInteractor {
    getNotifications(userId: string,page:Number): Promise<INotification[]>
    updateNotifications(userId: string): Promise<boolean>
}