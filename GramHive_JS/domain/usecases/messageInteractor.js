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
exports.MessageInteractorImpl = void 0;
class MessageInteractorImpl {
    constructor(Repository) {
        this.Repository = Repository;
    }
    getMessages(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.Repository.getMessages(chatId);
                return messages;
            }
            catch (error) {
                console.error('Error retrieving messages:', error);
                throw new Error('Error retrieving messages');
            }
        });
    }
    sendMessage(sender, chatId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('2');
                var newMessage = {
                    sender: sender,
                    content: content,
                    chat: chatId
                };
                const message = yield this.Repository.sendMessage(newMessage);
                if (message) {
                    yield this.Repository.updateChat(chatId, message);
                }
                return message;
            }
            catch (error) {
                console.error('Error sending messages:', error);
                throw new Error('Error sending messages');
            }
        });
    }
    fileUpload(sender, chatId, files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Repository.saveFiles(sender, chatId, files);
            }
            catch (error) {
            }
        });
    }
    deleteMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('3');
            if (!messageId) {
                throw new Error('Message ID is required');
            }
            const success = yield this.Repository.deleteMessage(messageId);
            return success;
        });
    }
    shareFiles(senderId, chatId, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                sender: senderId,
                content: 'shared some files',
                chat: chatId,
                files: files,
            };
            console.log('MEssage', message);
            const createdMessage = yield this.Repository.createMessage(message);
            yield this.Repository.updateChat(chatId, createdMessage);
            return createdMessage;
        });
    }
    shareAudio(senderId, chatId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = {
                sender: senderId,
                content: 'send a voice message',
                chat: chatId,
                audio: file,
            };
            console.log('MEssage', message);
            const createdMessage = yield this.Repository.createMessage(message);
            yield this.Repository.updateChat(chatId, createdMessage);
            return createdMessage;
        });
    }
}
exports.MessageInteractorImpl = MessageInteractorImpl;
