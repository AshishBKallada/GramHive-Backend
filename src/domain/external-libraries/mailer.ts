import { IMailer } from "../interfaces/external-lib/IMailer";
import { generateRandomOTP } from "../../functions/OTP-generator";
import sendEmail from "../../functions/send-Mail";

export class MailerImpl implements IMailer{
    async sendMail(email: string): Promise<{ otp: string, success: boolean }> {
        const otp = generateRandomOTP(4);
        console.log('OTP', otp);

        const result = await sendEmail(email, otp, 'otp');
        return { otp: otp, success: result.success };
    }
    async sendPasswordResetLink(email: string,token:string): Promise<boolean>{
        console.log('token', token);
        
        const link = `http://localhost:5173/reset-password/${token}`;
        const result = await sendEmail(email, link, 'link');
        return result.success;
}
}

