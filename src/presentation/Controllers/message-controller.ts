import { Request, Response } from "express";
import { IMessageInteractor } from "../../domain/interfaces/usecases/messageInteractor";

export class messageController{
    constructor(private readonly interactor:IMessageInteractor){}

    async onSendMessage(req:Request, res:Response){
        try {
            console.log('1');
            
            const chatId = req.params.chatId;
            const { content } = req.body;
            const sender = req.user._id

            const sendMessage = await this.interactor.sendMessage(sender,chatId, content);
            return res.status(200).json(sendMessage)

        } catch (error) {
            console.error('Error sending chat:', error);
            res.status(500).json({ message: 'Error sending chat' });
        }
    }

    async onAllMessages(req:Request, res:Response){
        try {
            const chatId = req.params.chatId;
            
            const messages = await this.interactor.getMessages(chatId);
            return res.status(200).json(messages)

        } catch (error) {
            console.error('Error accessing messages:', error);
            res.status(500).json({ message: 'Error accessing messages' });
        }


    }
}