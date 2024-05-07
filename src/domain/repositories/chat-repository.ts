import chatModel from "../../data/data-sources/mongodb/models/chat";
import userModel from "../../data/data-sources/mongodb/models/user";
import { IChatRepository } from "../interfaces/repositories/chat-repository";

export class ChatRepositoryImpl implements IChatRepository {

    async checkIfChatExists(userId: string, currentUserId: string): Promise<any> {
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
                .sort({ updatedAt: -1 });
    
            const populatedResults = await userModel.populate(results, {
                path: 'latestMessage.sender',
                select: 'name image email',
            });
    
            console.log('results', populatedResults);
            
            return populatedResults; 
        } catch (error) {
            console.error('Failed to get chats:', error);
            return null;
        }
    }
    
    
    
    async createGroupChat(groupData: any): Promise<any> {
        console.log('33',groupData);
        
        try {
            const createGroup = await chatModel.create(groupData);
            const fullGroupChat = await chatModel.find({_id: createGroup._id})
            .populate('users','-password')
            .populate('groupAdmin','-password')
            return fullGroupChat;
        } catch (error) {
            throw new Error('Failed to create group in db')
        }
    }

}