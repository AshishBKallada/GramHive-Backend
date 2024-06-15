import { Message } from "../../entities/message"
import { User } from "../../entities/user"

export interface IMessageInteractor {
    getMessages(chatId: string): Promise<any>
    sendMessage(sender: User, chatId: string, content: any): Promise<any>
    deleteMessage(messagId: string): Promise<boolean>
    shareFiles(senderId:string,chatId: string, files: any[]): Promise<Message>
    shareAudio(senderId:string,chatId: string, file: any): Promise<Message>
}