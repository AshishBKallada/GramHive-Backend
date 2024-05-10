import mongoose from "mongoose";
import { User } from "../entities/user";
import { IChatRepository } from "../interfaces/repositories/chat-repository";
import { IChatInteractor } from "../interfaces/usecases/chatInteractor";

export class chatInteractorImpl implements IChatInteractor {
    constructor(private readonly Repository: IChatRepository) { }

    async accessChat(userId: string, currUserId: string): Promise<any> {
        console.log('2');
        
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

            return getChats
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async createGroup(groupName: string, users: User[], adminId: string): Promise<any> {
        console.log('22');

        if (!groupName || !users) {
            throw new Error('Invalid group data');
        }
        const userIdsString = JSON.parse(users);

        const userIds = userIdsString.map((userId: string) => new mongoose.Types.ObjectId(userId));
        userIds.push(adminId)
        console.log('users: ', userIds);

        if (users.length < 1) {
            throw new Error('More than 2 users are required');
        }
        try {
            const groupData = {
                chatName: groupName,
                users: userIds,
                isGroupChat: true,
                groupAdmin: adminId,
            }
            const groupChat = await this.Repository.createGroupChat(groupData)

            return groupChat;
        } catch (error) {
            console.error('Error creating group:', error);
            throw error;
        }

    }
    async renameGroup(groupId: string, newName: string): Promise<any> {
        try {
            if (!groupId) {
                throw new Error('groupId must be provided');
            }
            if (!newName) {
                throw new Error('group name must be provided');
            }
            const isGroupNameUpdated = await this.Repository.updateGroupName(groupId, newName)
            return isGroupNameUpdated;
        } catch (error) {
            console.error('Error renaming group:', error);
            throw error;
        }
    }
    async addToGroup(groupId: string, users: User[]): Promise<any> {
        try {
            
            if (!groupId) {
                throw new Error('groupId must be provided');
            }
            if (users.length<1) {
                throw new Error('Atleast one user must be provided');
            }
            const userIdsString = JSON.parse(users);

            const userIds = userIdsString.map((userId: string) => new mongoose.Types.ObjectId(userId));
            console.log('users: ', userIds);

            const isAddedToGroup = await this.Repository.addTogroup(groupId,userIds);
            return isAddedToGroup;
        } catch (error) {
            console.error('Error renaming group:', error);
            throw error;
        }
    }
    async removeFromGroup(groupId:string,users:User[]) : Promise<any>{
        try {
            if (!groupId) {
                throw new Error('groupId must be provided');
            }
            if (users.length<1) {
                throw new Error('Atleast one user must be provided');
            }
            const userIdsString = JSON.parse(users);

            const userIds = userIdsString.map((userId: string) => new mongoose.Types.ObjectId(userId));
            console.log('users: ', userIds);

            const isRemovedFromGroup = await this.Repository.removeFromGroup(groupId,userIds);
            return isRemovedFromGroup;
        } catch (error) {
            console.error('Error renaming group:', error);
            throw error;
        }
    }
    async deleteGroup(groupId:string) : Promise<any>{
        try {
            if (!groupId) {
                throw new Error('groupId must be provided');
            }
            const isgroupDeleted = await this.Repository.deleteGroup(groupId);
            return isgroupDeleted;
        } catch (error) {
            console.error('Error deleting group:', error);
            throw error;
        }
    }



}

