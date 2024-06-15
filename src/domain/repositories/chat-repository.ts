import chatModel from "../../data/data-sources/mongodb/models/chat";
import userModel from "../../data/data-sources/mongodb/models/user";
import { User } from "../entities/user";
import { IChatRepository } from "../interfaces/repositories/chat-repository";

export class ChatRepositoryImpl implements IChatRepository {

    async checkIfChatExists(userId: string, currentUserId: string): Promise<any> {
        console.log('3',userId, currentUserId);
        
        var isChat = await chatModel.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: currentUserId } } },
                { users: { $elemMatch: { $eq: userId } } },
            ]
        }).populate('users', '-password').populate('latestMessage');

        isChat = await userModel.populate(isChat, { path: 'latestMessage.sender', select: "username image email" });

        if (isChat.length > 0) {
            return isChat[0];
        } else {
            return null;
        }
    }

    async createChat(userId: string, currentUserId: string): Promise<any> {
        console.log('4');
        
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [currentUserId, userId]
        };
        try {
            const createdChat = await chatModel.create(chatData);
            const fullChat = await chatModel.findOne({ _id: createdChat._id }).populate('users', '-password');
            return fullChat;
        } catch (error) {
            console.error('Error creating chat:', error);
            throw new Error('Error creating chat');
        }
    }

    async getChats(userId: string): Promise<any> {
        try {
          console.log('33');
      
          const results = await chatModel.find({ users: { $elemMatch: { $eq: userId } } })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate({
              path: 'latestMessage',
              populate: { path: 'sender', select: 'username name image' }
            })
            .sort({ updatedAt: -1 });

      
          console.log('results', results[0].latestMessage);
      
          return results;
        } catch (error) {
          console.error('Failed to get chats:', error);
          return null;
        }
      }
      



    async createGroupChat(groupData: any): Promise<any> {
        console.log('33', groupData);

        try {
            const createGroup = await chatModel.create(groupData);
            const fullGroupChat = await chatModel.find({ _id: createGroup._id })
                .populate('users', '-password')
                .populate('groupAdmin', '-password')
            return fullGroupChat;
        } catch (error) {
            throw new Error('Failed to create group in db')
        }
    }

    async updateGroupName(groupId: string, groupName: string): Promise<any> {
        try {
            const isGroupRenamed = await chatModel.findByIdAndUpdate(groupId, { $set: { chatName: groupName } });
            return isGroupRenamed;
        } catch (error) {
            throw new Error('Failed to rename group')
        }
    }

    async addTogroup(groupId: string, users: User[]): Promise<any> {
        try {

            const isAddedToGroup = await chatModel.findByIdAndUpdate(groupId, { $push: { users: users } })
            console.log('isAddedToGroup', isAddedToGroup);

            return isAddedToGroup;
        } catch (error) {
            throw new Error('Failed to add to group')
        }
    }

    async removeFromGroup(groupId: string, users: User[]): Promise<any> {
        try {
            const isRemovedFromGroup = await chatModel.findByIdAndUpdate(groupId, { $pull: { users: { $in: users } } })
            console.log('isRemovedFromGroup', isRemovedFromGroup);

            return isRemovedFromGroup;
        } catch (error) {
            throw new Error('Failed to add to group')
        }
    }
    async deleteGroup(groupId:string): Promise<any>{
        try {
             const isGroupDeleted = await chatModel.findByIdAndDelete(groupId);
             return isGroupDeleted ? true : false;
        } catch (error) {
            throw new Error('Failed to add to group')
        }
    }

    async findChatBetweenUsers(user1Id:string, user2Id:string):Promise<any> {
        return await chatModel.findOne({
            isGroupChat: false,
            users: { $all: [user1Id, user2Id] }
        });
    }

    async createShareChat(chatData:any):Promise<any> {
        return await chatModel.create(chatData);
    }

    async updateChatLatestMessage(chatId:string, messageId:string) :Promise<any>{
        return await chatModel.findByIdAndUpdate(chatId, { latestMessage: messageId });
    }



}