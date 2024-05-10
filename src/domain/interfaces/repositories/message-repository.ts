
export interface IMessageRepository{
    sendMessage(newMessage: any): Promise<any>
    getMessages(chatId:string):Promise<any>
    updateChat(chatId:string,message:any): Promise<any>
}