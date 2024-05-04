"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jwt = require('jsonwebtoken');
function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, 'your-access-token-secret', { expiresIn: '15m' });
}
exports.generateAccessToken = generateAccessToken;
