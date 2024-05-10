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
exports.chatInteractorImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class chatInteractorImpl {
    constructor(Repository) {
        this.Repository = Repository;
    }
    accessChat(userId, currUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2');
            if (!userId) {
                console.log('UserId not present');
                return null;
            }
            const isChat = yield this.Repository.checkIfChatExists(userId, currUserId);
            if (isChat) {
                return isChat;
            }
            else {
                return this.Repository.createChat(userId, currUserId);
            }
        });
    }
    fetchChat(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('222');
            try {
                const getChats = yield this.Repository.getChats(userId);
                return getChats;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    createGroup(groupName, users, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('22');
            if (!groupName || !users) {
                throw new Error('Invalid group data');
            }
            const userIdsString = JSON.parse(users);
            const userIds = userIdsString.map((userId) => new mongoose_1.default.Types.ObjectId(userId));
            userIds.push(adminId);
            console.log('users: ', userIds);
            if (users.length < 1) {
                throw new Error('More than 2 users are required');
            }
            try {
                const groupData = {
                    chatName: groupName,
                    users: userIds,
                    isGroupChat: true,
                    groupAdmin: adminId,
                };
                const groupChat = yield this.Repository.createGroupChat(groupData);
                return groupChat;
            }
            catch (error) {
                console.error('Error creating group:', error);
                throw error;
            }
        });
    }
    renameGroup(groupId, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!groupId) {
                    throw new Error('groupId must be provided');
                }
                if (!newName) {
                    throw new Error('group name must be provided');
                }
                const isGroupNameUpdated = yield this.Repository.updateGroupName(groupId, newName);
                return isGroupNameUpdated;
            }
            catch (error) {
                console.error('Error renaming group:', error);
                throw error;
            }
        });
    }
    addToGroup(groupId, users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!groupId) {
                    throw new Error('groupId must be provided');
                }
                if (users.length < 1) {
                    throw new Error('Atleast one user must be provided');
                }
                const userIdsString = JSON.parse(users);
                const userIds = userIdsString.map((userId) => new mongoose_1.default.Types.ObjectId(userId));
                console.log('users: ', userIds);
                const isAddedToGroup = yield this.Repository.addTogroup(groupId, userIds);
                return isAddedToGroup;
            }
            catch (error) {
                console.error('Error renaming group:', error);
                throw error;
            }
        });
    }
    removeFromGroup(groupId, users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!groupId) {
                    throw new Error('groupId must be provided');
                }
                if (users.length < 1) {
                    throw new Error('Atleast one user must be provided');
                }
                const userIdsString = JSON.parse(users);
                const userIds = userIdsString.map((userId) => new mongoose_1.default.Types.ObjectId(userId));
                console.log('users: ', userIds);
                const isRemovedFromGroup = yield this.Repository.removeFromGroup(groupId, userIds);
                return isRemovedFromGroup;
            }
            catch (error) {
                console.error('Error renaming group:', error);
                throw error;
            }
        });
    }
    deleteGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!groupId) {
                    throw new Error('groupId must be provided');
                }
                const isgroupDeleted = yield this.Repository.deleteGroup(groupId);
                return isgroupDeleted;
            }
            catch (error) {
                console.error('Error deleting group:', error);
                throw error;
            }
        });
    }
}
exports.chatInteractorImpl = chatInteractorImpl;
