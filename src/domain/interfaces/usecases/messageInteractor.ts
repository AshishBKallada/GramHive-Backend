import { User } from "../../entities/user"

export interface IMessageInteractor{
    getMessages(chatId: string): Promise<any>
    sendMessage(sender:User,chatId: string,content:any): Promise<any>
}