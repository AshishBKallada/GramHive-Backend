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
const mailer_1 = __importDefault(require("../config/mailer"));
const nodemailer = require("nodemailer");
function sendEmail(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: mailer_1.default.user,
                pass: mailer_1.default.pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: mailer_1.default.user,
            to: email,
            subject: 'hey this is a signup Verification mail from GramHive',
            text: `Your otp is ${otp}. Use this OTP to complete your signup process`,
        };
        try {
            const info = yield transporter.sendMail(mailOptions);
            console.log("Email sent: ", info.response);
            return { success: true };
        }
        catch (error) {
            console.error("Error sending email: ", error);
            return { success: false };
        }
    });
}
exports.default = sendEmail;
