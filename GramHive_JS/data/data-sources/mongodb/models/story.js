"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const storySchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    story: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    seenBy: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            time: {
                type: Date,
                default: new Date()
            }
        }
    ]
});
const storyModel = mongoose_1.default.model('story', storySchema);
exports.default = storyModel;
