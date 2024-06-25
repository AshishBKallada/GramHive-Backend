import { INotification } from "../entities/notifications";
import { INotificationRepository } from "../interfaces/repositories/notification-repository";
import { INotificationInteractor } from "../interfaces/usecases/notificationInteractor";


export class NotificationInteractor implements INotificationInteractor {
    constructor(private readonly repository: INotificationRepository) { }

    async getNotifications(userId: string,page:Number): Promise<INotification[]> {
        try {
            const notifications = await this.repository.getUserNotifications(userId,page);
            return notifications;
        } catch (error) {
            console.error("Error getting notifications:", error);
            throw error;
        }
    }

    async updateNotifications(userId: string): Promise<boolean> {
        try {
            const success = await this.repository.updateNotifications(userId);
            return success;
        } catch (error) {
            console.error("Error updating notifications:", error);
            throw error;
        }
    }


}
