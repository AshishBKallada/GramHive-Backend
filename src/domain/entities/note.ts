import mongoose from "mongoose";

export interface Note {
    _id?: string;
    userId: mongoose.Schema.Types.ObjectId;
    note: string;
    createdAt?: Date;
    replies?: string[];
}