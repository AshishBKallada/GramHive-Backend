"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const replySchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    authorId: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});
const noteSchema = new mongoose_1.Schema({
    userId: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [replySchema],
}, {
    expireAfterSeconds: 24 * 60 * 60,
});
exports.NoteModel = (0, mongoose_1.model)('Note', noteSchema);
