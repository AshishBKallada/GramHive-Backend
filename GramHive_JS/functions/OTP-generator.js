"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomOTP = void 0;
const generateRandomOTP = (length) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
exports.generateRandomOTP = generateRandomOTP;
