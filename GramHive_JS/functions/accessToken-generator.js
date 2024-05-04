"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jwt = require('jsonwebtoken');
function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, 'thadavil__aanu', { expiresIn: '1d' });
}
exports.generateAccessToken = generateAccessToken;
