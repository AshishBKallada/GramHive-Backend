"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserReportSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const ReportSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ['user', 'post', 'content'],
        required: true,
    },
    reportedUser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return this.type === 'user';
        },
    },
    reportedPost: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'posts',
        required: function () {
            return this.type === 'post';
        },
    },
    content: {
        type: String,
        required: function () {
            return this.type === 'content';
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: function () {
            return this.type === 'content';
        },
    },
    isSaved: {
        type: Boolean,
        default: false,
    },
    users: {
        type: [UserReportSchema],
        required: function () {
            return this.type === 'post' || this.type === 'user';
        },
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return this.type === 'content';
        },
    },
    response: {
        type: String,
    }
});
const ReportModel = mongoose_1.default.model('Report', ReportSchema);
exports.default = ReportModel;
