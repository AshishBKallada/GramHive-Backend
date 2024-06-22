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
const nodemailer = require('nodemailer');
const mailer_1 = __importDefault(require("../config/mailer"));
function sendEmail(email, content, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: mailer_1.default.user,
                pass: mailer_1.default.pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        let subject, text;
        if (type === 'otp') {
            subject = 'Signup Verification Mail from GramHive';
            text = `Your OTP is ${content}. Use this OTP to complete your signup process.`;
        }
        else if (type === 'link') {
            subject = 'Password Reset Request';
            text = `Click on the following link to reset your password: ${content}`;
        }
        const mailOptions = {
            from: mailer_1.default.user,
            to: email,
            subject: subject,
            text: text,
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return { success: true };
        }
        catch (error) {
            console.error('Error sending email:', error);
            return { success: false };
        }
    });
}
exports.default = sendEmail;
