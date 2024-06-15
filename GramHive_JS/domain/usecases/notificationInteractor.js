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
exports.NotificationInteractor = void 0;
class NotificationInteractor {
    constructor(repository) {
        this.repository = repository;
    }
    getNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield this.repository.getUserNotifications(userId);
                return notifications;
            }
            catch (error) {
                console.error("Error getting notifications:", error);
                throw error;
            }
        });
    }
    updateNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.repository.updateNotifications(userId);
                return success;
            }
            catch (error) {
                console.error("Error updating notifications:", error);
                throw error;
            }
        });
    }
}
exports.NotificationInteractor = NotificationInteractor;
