import mongoose from "mongoose";
import { User } from "../entities/user";
import { IChatRepository } from "../interfaces/repositories/chat-repository";
import { IChatInteractor } from "../interfaces/usecases/chatInteractor";

export class chatInteractorImpl implements IChatInteractor {
    constructor(private readonly Repository: IChatRepository) { }

    async accessChat(userId: string, currUserId: string): Promise<any> {
        if (!userId) {
            console.log('UserId not present');
            return null
        }
        const isChat = await this.Repository.checkIfChatExists(userId, currUserId);
        if (isChat) {
            return isChat;
        } else {
            return this.Repository.createChat(userId, currUserId);
        }

    }
    async fetchChat(userId: string): Promise<any> {
        console.log('222');

        try {
            const getChats = await this.Repository.getChats(userId);
            console.log('getCHAts', getChats);
            
            return getChats
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async createGroup(groupName: string, users: User[],adminId:string): Promise<any> {
 console.log('22');
 
        if (!groupName || !users) {
            throw new Error('Invalid group data');
        }
        const userIdsString = JSON.parse(users);
        
        const userIds = userIdsString.map((userId: string) =>new mongoose.Types.ObjectId(userId));
         userIds.push(adminId)
        console.log('users: ', userIds);
        
        if (users.length < 1) {
            throw new Error('More than 2 users are required');
        }
        try {
            const groupData = {
                chatName: groupName,
                users: userIds,
                isGroupChat:true,
                groupAdmin:adminId,
            }
            const groupChat = await this.Repository.createGroupChat(groupData)

            return groupChat;
        } catch (error) {
            console.error('Error creating group:', error);
            throw error;
        }

    }

}