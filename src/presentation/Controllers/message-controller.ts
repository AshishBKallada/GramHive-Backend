import { Request, Response } from "express";
import { IMessageInteractor } from "../../domain/interfaces/usecases/messageInteractor";

export class messageController {
    constructor(private readonly interactor: IMessageInteractor) { }

    async onSendMessage(req: Request, res: Response) {
        try {
            console.log('1233');

            const chatId = req.params.chatId;
            const { content } = req.body;
            const sender = req.user._id

            const sendMessage = await this.interactor.sendMessage(sender, chatId, content);
            return res.status(200).json(sendMessage)

        } catch (error) {
            console.error('Error sending chat:', error);
            res.status(500).json({ message: 'Error sending chat' });
        }
    }

    async onAllMessages(req: Request, res: Response) {
        try {
            const chatId = req.params.chatId;

            const messages = await this.interactor.getMessages(chatId);
            return res.status(200).json(messages)

        } catch (error) {
            console.error('Error accessing messages:', error);
            res.status(500).json({ message: 'Error accessing messages' });
        }
    }



    async onDeleteMessage(req: Request, res: Response) {
        try {
            console.log('2');

            const messagId = req.params.Id;
            const success = await this.interactor.deleteMessage(messagId);
            return res.status(200).json({ success })

        } catch (error) {
            console.error('Error deleting messages:', error);
            res.status(500).json({ message: 'Error deleting messages' });
        }
    }

    async onShareFiles(req: Request, res: Response) {

        const senderId = req.user._id;
        const chatId = req.params.chatId;
        const files = req.uploadedFiles;
        try {
            const message = await this.interactor.shareFiles(senderId, chatId, files);
            console.log('Mesgga ereturned controller', message);


            res.status(201).json({ message: 'Files shared successfully', data: message });
        } catch (error) {
            console.error('Error sharing files:', error);
            res.status(500).json({ message: 'Error sharing files' });
        }
    }

    async onShareAudio(req: Request, res: Response) {
        const chatId = req.params.chatId;
        const senderId = req.user._id;
        const file = req.audio;
        console.log('File received:', req.audio);
        try {
            const message = await this.interactor.shareAudio(senderId, chatId, file);
            console.log('Mesgga ereturned controller', message);
            res.status(201).json({ message: 'Files shared successfully', data: message });
        } catch (error) {
            console.error('Error sharing files:', error);
            res.status(500).json({ message: 'Error sharing audio' });
        }
    }
}