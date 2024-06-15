import { Schema, model } from "mongoose";
import { INotification } from "../../../../domain/entities/notifications";



const NotificationSchema = new Schema<INotification>({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    postId: { type: String},
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
})

const NotificationModel = model<INotification>('Notification', NotificationSchema);
export default NotificationModel;
