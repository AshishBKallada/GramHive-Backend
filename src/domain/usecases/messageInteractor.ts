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
            console.log('2');
            
            var newMessage = {
                sender: sender,
                content: content,
                chat: chatId
            }
            const message = await this.Repository.sendMessage(newMessage)
            if(message)
                {
                    await this.Repository.updateChat(chatId,message)
                }
            return message;
        } catch (error) {
            console.error('Error sending messages:', error);
            throw new Error('Error sending messages');
        }
    }

}