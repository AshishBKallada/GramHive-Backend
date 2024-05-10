import chatModel from "../../data/data-sources/mongodb/models/chat";
import messageModel from "../../data/data-sources/mongodb/models/message";
import userModel from "../../data/data-sources/mongodb/models/user";
import { IMessageInteractor } from "../interfaces/usecases/messageInteractor";

export class MessageRepositoryImpl implements IMessageInteractor {

    async sendMessage(newMessage: any): Promise<any> {
        try {
            console.log('3',newMessage);
            
            var message = await messageModel.create(newMessage)
              
            message = await message.populate('sender', 'name image')
            message = await message.populate('chat');
            message = await userModel.populate(message, {
                path: "chat.users",
                select: "name image email"
            });
             
            return message;
        } catch (error) {
            console.error('Error saving messages:', error);
            throw new Error('Error saving messages');
        }
    }

    async updateChat(chatId: string, message: any): Promise<any> {
        try {
            const updateLatestMessage = await chatModel.findByIdAndUpdate(chatId, { latestMessage: message });
        } catch (error) {
            console.error('Error updating chat:', error);
            throw new Error('Error updating chat');
        }
    }


    async getMessages(chatId: string): Promise<any> {
        console.log('34',chatId);

        try {
            const messages = await messageModel.find({ chat: chatId })
                .populate("sender", " name image email ")
                .populate('chat')
            return messages
        } catch (error) {
            console.error('Error retrieving messages:', error);
            throw new Error('Error retrieving messages');
        }
    }
}