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
exports.NotificationRepositoryImpl = void 0;
const notifications_1 = __importDefault(require("../../data/data-sources/mongodb/models/notifications"));
class NotificationRepositoryImpl {
    addNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield notifications_1.default.create(notification);
                return true;
            }
            catch (error) {
                console.error('Error adding notification:', error);
                return false;
            }
        });
    }
    getUserNotifications(userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ITEMS_PER_PAGE = 9;
                const skip = (page - 1) * ITEMS_PER_PAGE;
                return yield notifications_1.default.find({ userId }).skip(skip).limit(ITEMS_PER_PAGE).sort({ _id: -1 }).exec();
            }
            catch (error) {
                console.error('Error retrieving user notifications:', error);
                return [];
            }
        });
    }
    updateNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield notifications_1.default.updateMany({ userId: userId, read: false }, { read: true });
                return true;
            }
            catch (error) {
                console.error('Error marking notifications as read:', error);
                return false;
            }
        });
    }
}
exports.NotificationRepositoryImpl = NotificationRepositoryImpl;
