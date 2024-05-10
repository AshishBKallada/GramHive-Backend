"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
class messageController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onSendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('1');
                const chatId = req.params.chatId;
                const { content } = req.body;
                const sender = req.user._id;
                const sendMessage = yield this.interactor.sendMessage(sender, chatId, content);
                return res.status(200).json(sendMessage);
            }
            catch (error) {
                console.error('Error sending chat:', error);
                res.status(500).json({ message: 'Error sending chat' });
            }
        });
    }
    onAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = req.params.chatId;
                const messages = yield this.interactor.getMessages(chatId);
                return res.status(200).json(messages);
            }
            catch (error) {
                console.error('Error accessing messages:', error);
                res.status(500).json({ message: 'Error accessing messages' });
            }
        });
    }
}
exports.messageController = messageController;
