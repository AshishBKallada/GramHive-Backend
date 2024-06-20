import { ObjectId } from "mongoose";
import { Message } from "../entities/message";
import { User } from "../entities/user";
import { IMessageRepository } from "../interfaces/repositories/message-repository";
import { IMessageInteractor } from "../interfaces/usecases/messageInteractor";

export class MessageInteractorImpl implements IMessageInteractor {
    constructor(private readonly Repository: IMessageRepository) { }

    async getMessages(chatId: string): Promise<any> {
        try {
            const messages = await this.Repository.getMessages(chatId);
            return messages;
        } catch (error) {
            console.error('Error retrieving messages:', error);
            throw new Error('Error retrieving messages');
        }

    }
    async sendMessage(sender: User, chatId: string, content: any): Promise<any> {
        try {
            var newMessage = {
                sender: sender,
                content: content,
                chat: chatId
            }
            const message = await this.Repository.sendMessage(newMessage)
            if (message) {
                await this.Repository.updateChat(chatId, message)
            }
            return message;
        } catch (error) {
            console.error('Error sending messages:', error);
            throw new Error('Error sending messages');
        }
    }

    async fileUpload(sender: User, chatId: string, files: any): Promise<any> {
        try {
            await this.Repository.saveFiles(sender, chatId, files);
        } catch (error) {

        }
    }

    async deleteMessage(messageId: string): Promise<boolean> {
        if (!messageId) {
            throw new Error('Message ID is required');
        }
        const success = await this.Repository.deleteMessage(messageId);
        return success;
    }

    async shareFiles(senderId: string, chatId: string, files: any[]): Promise<Message> {
        const message: Message = {
            sender: senderId,
            content: 'shared some files',
            chat: chatId,
            files: files,
        };

        console.log('MEssage', message);

        const createdMessage = await this.Repository.createMessage(message);
        await this.Repository.updateChat(chatId, createdMessage);

        return createdMessage;
    }
    async shareAudio(senderId: string, chatId: string, file: any): Promise<Message> {
        const message: Message = {
            sender: senderId,
            content: 'send a voice message',
            chat: chatId,
            audio: file,
        };
        console.log('MEssage', message);
        const createdMessage = await this.Repository.createMessage(message);
        await this.Repository.updateChat(chatId, createdMessage);

        return createdMessage;
    }


}