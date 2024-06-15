import { ObjectId } from "mongoose";

export interface Message {
    sender: string;  
    content: string;
    chat: string;    
    sharedPost?: ObjectId;  
    files?: File[];  
    createdAt?: Date; 
    updatedAt?: Date; 
    audio?:string; 
}