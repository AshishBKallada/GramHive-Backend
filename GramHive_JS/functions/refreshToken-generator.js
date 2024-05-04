"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = void 0;
const jwt = require('jsonwebtoken');
function generateRefreshToken(user) {
    return jwt.sign({ userId: user.email }, 'thadavil__aanu', { expiresIn: '7d' });
}
exports.generateRefreshToken = generateRefreshToken;
