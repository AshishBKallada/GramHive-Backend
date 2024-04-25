"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const reply_1 = __importDefault(require("./reply"));
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    replies: [reply_1.default.schema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const CommentModel = mongoose.model('Comment', commentSchema);
exports.default = CommentModel;
