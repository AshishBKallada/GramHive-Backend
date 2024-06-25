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
exports.NotificationController = void 0;
class NotificationController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onGetNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            const page = req.params.page;
            try {
                const notifications = yield this.interactor.getNotifications(userId, page);
                return res.json(notifications);
            }
            catch (error) {
                console.error("Error getting notifications:", error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    onUpdateNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user._id;
            try {
                const success = yield this.interactor.updateNotifications(userId);
                res.status(200).json(success);
            }
            catch (error) {
                console.error("Error updating notifications:", error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.NotificationController = NotificationController;
