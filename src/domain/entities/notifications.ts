import { Document } from "mongoose";

export interface INotification extends Document {
    userId: string,
    type: string,
    postId?: string,
    message: string,
    createdAt: Date,
    read: boolean,
}