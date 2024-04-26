import Mailer from "../config/mailer";
const nodemailer = require("nodemailer");


async function sendEmail(email: string, otp: string): Promise<{ success: boolean }> {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: Mailer.user,
            pass: Mailer.pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: Mailer.user,
        to: email,
        subject: 'hey this is a signup Verification mail from GramHive',
        text: `Your otp is ${otp}. Use this OTP to complete your signup process`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        return { success: true };
    } catch (error) {
        console.error("Error sending email: ", error);
        return { success: false };
    }
}

export default sendEmail;