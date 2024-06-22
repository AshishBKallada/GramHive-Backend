"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerImpl = void 0;
const OTP_generator_1 = require("../../functions/OTP-generator");
const send_Mail_1 = __importDefault(require("../../functions/send-Mail"));
class MailerImpl {
    sendMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = (0, OTP_generator_1.generateRandomOTP)(4);
            console.log('OTP', otp);
            const result = yield (0, send_Mail_1.default)(email, otp, 'otp');
            return { otp: otp, success: result.success };
        });
    }
    sendPasswordResetLink(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('token', token);
            const link = `http://localhost:3000/reset-password/${token}`;
            const result = yield (0, send_Mail_1.default)(email, link, 'link');
            return result.success;
        });
    }
}
exports.MailerImpl = MailerImpl;
