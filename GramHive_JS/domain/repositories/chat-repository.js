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
exports.ChatRepositoryImpl = void 0;
const chat_1 = __importDefault(require("../../data/data-sources/mongodb/models/chat"));
const user_1 = __importDefault(require("../../data/data-sources/mongodb/models/user"));
class ChatRepositoryImpl {
    checkIfChatExists(userId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var isChat = yield chat_1.default.find({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: currentUserId } } },
                    { users: { $elemMatch: { $eq: userId } } },
                ]
            }).populate('users', '-password').populate('latestMessage');
            isChat = yield user_1.default.populate(isChat, { path: 'latestMessage.sender', select: "username image email" });
            if (isChat.length > 0) {
                return isChat[0];
            }
            else {
                return null;
            }
        });
    }
    createChat(userId, currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [currentUserId, userId]
            };
            try {
                const createdChat = yield chat_1.default.create(chatData);
                const fullChat = yield chat_1.default.findOne({ _id: createdChat._id }).populate('users', '-password');
                return fullChat;
            }
            catch (error) {
                console.error('Error creating chat:', error);
                throw new Error('Error creating chat');
            }
        });
    }
    getChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('33');
                const results = yield chat_1.default.find({ users: { $elemMatch: { $eq: userId } } })
                    .populate('users', '-password')
                    .populate('groupAdmin', '-password')
                    .sort({ updatedAt: -1 });
                const populatedResults = yield user_1.default.populate(results, {
                    path: 'latestMessage.sender',
                    select: 'name image email',
                });
                console.log('results', populatedResults);
                return populatedResults;
            }
            catch (error) {
                console.error('Failed to get chats:', error);
                return null;
            }
        });
    }
    createGroupChat(groupData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('33', groupData);
            try {
                const createGroup = yield chat_1.default.create(groupData);
                const fullGroupChat = yield chat_1.default.find({ _id: createGroup._id })
                    .populate('users', '-password')
                    .populate('groupAdmin', '-password');
                return fullGroupChat;
            }
            catch (error) {
                throw new Error('Failed to create group in db');
            }
        });
    }
}
exports.ChatRepositoryImpl = ChatRepositoryImpl;
