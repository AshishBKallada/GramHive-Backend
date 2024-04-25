"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const comment_1 = __importDefault(require("./comment"));
const Like = require('./likes');
const postSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        // required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    tags: [
        {
            type: String,
            required: true,
        }
    ],
    comments: [comment_1.default.schema],
    likes: [Like.schema],
    isChecked: {
        type: Boolean,
        required: true,
    }
});
const postModel = mongoose_1.default.model('posts', postSchema);
exports.default = postModel;
