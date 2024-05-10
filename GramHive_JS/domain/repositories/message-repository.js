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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepositoryImpl = void 0;
const chat_1 = __importDefault(require("../../data/data-sources/mongodb/models/chat"));
const message_1 = __importDefault(require("../../data/data-sources/mongodb/models/message"));
const user_1 = __importDefault(require("../../data/data-sources/mongodb/models/user"));
class MessageRepositoryImpl {
    sendMessage(newMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('3', newMessage);
                var message = yield message_1.default.create(newMessage);
                message = yield message.populate('sender', 'name image');
                message = yield message.populate('chat');
                message = yield user_1.default.populate(message, {
                    path: "chat.users",
                    select: "name image email"
                });
                return message;
            }
            catch (error) {
                console.error('Error saving messages:', error);
                throw new Error('Error saving messages');
            }
        });
    }
    updateChat(chatId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateLatestMessage = yield chat_1.default.findByIdAndUpdate(chatId, { latestMessage: message });
            }
            catch (error) {
                console.error('Error updating chat:', error);
                throw new Error('Error updating chat');
            }
        });
    }
    getMessages(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('34', chatId);
            try {
                const messages = yield message_1.default.find({ chat: chatId })
                    .populate("sender", " name image email ")
                    .populate('chat');
                return messages;
            }
            catch (error) {
                console.error('Error retrieving messages:', error);
                throw new Error('Error retrieving messages');
            }
        });
    }
}
exports.MessageRepositoryImpl = MessageRepositoryImpl;
