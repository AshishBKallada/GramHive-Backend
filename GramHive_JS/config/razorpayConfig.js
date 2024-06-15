"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = __importDefault(require("razorpay"));
const razorpayInstance = new razorpay_1.default({
    key_id: "rzp_test_bccs3wITCd60bv",
    key_secret: "4xIJ1fhnNxrqqVw9uwvR3sZc"
});
exports.default = razorpayInstance;
