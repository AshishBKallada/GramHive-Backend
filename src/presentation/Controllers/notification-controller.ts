import { Request, Response } from "express";
import { INotificationInteractor } from "../../domain/interfaces/usecases/notificationInteractor";

export class NotificationController {
    constructor(private readonly interactor: INotificationInteractor) { }

    async onGetNotifications(req: Request, res: Response): Promise<Response> {
        const userId = req.user._id;
        try {
            const notifications = await this.interactor.getNotifications(userId);
            
            return res.json(notifications);
        } catch (error) {
            console.error("Error getting notifications:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async onUpdateNotifications(req: Request, res: Response) {        
        const userId = req.user._id;
        try {
            const success = await this.interactor.updateNotifications(userId);
            res.status(200).json(success);
        } catch (error) {
            console.error("Error updating notifications:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    
}
