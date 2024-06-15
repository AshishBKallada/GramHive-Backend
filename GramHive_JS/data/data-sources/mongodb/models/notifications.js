"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    postId: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});
const NotificationModel = (0, mongoose_1.model)('Notification', NotificationSchema);
exports.default = NotificationModel;
