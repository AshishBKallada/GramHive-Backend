"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptResetToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const ENCRYPTION_KEY = crypto_1.default.randomBytes(32);
const IV_LENGTH = 16;
const decryptResetToken = (token) => {
    const iv = Buffer.from(token.slice(0, IV_LENGTH * 2), 'hex');
    const encryptedText = token.slice(IV_LENGTH * 2);
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
exports.decryptResetToken = decryptResetToken;
