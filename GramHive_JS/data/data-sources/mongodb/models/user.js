"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
    },
    isBan: {
        type: Boolean,
        default: false,
    },
    website: {
        type: String,
    },
    bio: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    googleId: {
        type: String
    },
    authSource: {
        type: String,
        enum: ['self', 'google'],
        default: 'self',
    },
});
const userModel = mongoose_1.default.model('User', userSchema);
exports.default = userModel;
