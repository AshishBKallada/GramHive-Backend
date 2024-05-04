"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign({ userId: user.email }, 'your-refresh-token-secret', { expiresIn: '7d' });
}
exports.generateRefreshToken = generateRefreshToken;
