import { IMailer } from "../interfaces/external-lib/IMailer";
import { generateRandomOTP } from "../../functions/OTP-generator";
import sendEmail from "../../functions/send-Mail";

export class MailerImpl implements IMailer{
    async sendMail(email: string): Promise<{ otp: string, success: boolean }> {
        const otp = generateRandomOTP(4);
        console.log('OTP', otp);

        const result = await sendEmail(email, otp);
        return { otp: otp, success: result.success };
    }
}

