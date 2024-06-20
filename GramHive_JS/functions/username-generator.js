"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomUsername = void 0;
const generateRandomUsername = (name) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const username = name.replace(/\s+/g, '').toLowerCase();
    return `${username}${randomSuffix}`;
};
exports.generateRandomUsername = generateRandomUsername;
