import { Document } from "mongoose";

export interface PostModel extends Document{
    userId: string;
    caption: string;
    images: string[];
    tags: string[];
    isChecked: boolean;
}
