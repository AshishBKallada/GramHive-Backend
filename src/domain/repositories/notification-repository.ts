import NotificationModel from "../../data/data-sources/mongodb/models/notifications";
import { INotification } from "../entities/notifications";
import { INotificationRepository } from "../interfaces/repositories/notification-repository";

export class NotificationRepositoryImpl implements INotificationRepository {
    async addNotification(notification: INotification): Promise<boolean> {
        try {
            await NotificationModel.create(notification);
            return true;
        } catch (error) {
            console.error('Error adding notification:', error);
            return false;
        }
    }
    async getUserNotifications(userId: string, page: number): Promise<INotification[]> {
        try {
            const ITEMS_PER_PAGE: number = 9;
            const skip: number = (page - 1) * ITEMS_PER_PAGE;
            return await NotificationModel.find({ userId }).skip(skip).limit(ITEMS_PER_PAGE).sort({ _id: -1 }).exec();
        } catch (error) {
            console.error('Error retrieving user notifications:', error);
            return [];
        }
    }
    
    async updateNotifications(userId: string): Promise<boolean> {
        try {
            await NotificationModel.updateMany({ userId: userId, read: false }, { read: true });
            return true;
        } catch (error) {
            console.error('Error marking notifications as read:', error);
            return false;
        }
    }
}