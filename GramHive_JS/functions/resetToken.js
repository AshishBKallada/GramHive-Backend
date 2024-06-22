"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromToken = exports.generateResetToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const tokenUserIdMap = new Map();
const TOKEN_LENGTH = 5;
const generateResetToken = (userId) => {
    const hash = crypto_1.default.createHash('sha256');
    hash.update(userId);
    const digest = hash.digest('hex');
    const token = digest.substring(0, TOKEN_LENGTH);
    tokenUserIdMap.set(token, userId);
    return token;
};
exports.generateResetToken = generateResetToken;
const getUserIdFromToken = (token) => {
    return tokenUserIdMap.get(token) || null;
};
exports.getUserIdFromToken = getUserIdFromToken;
