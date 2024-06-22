const nodemailer = require('nodemailer');
import Mailer from '../config/mailer';

async function sendEmail(email: string, content: string, type: 'otp' | 'link'): Promise<{ success: boolean }> {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: Mailer.user,
            pass: Mailer.pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let subject, text;

    if (type === 'otp') {
        subject = 'Signup Verification Mail from GramHive';
        text = `Your OTP is ${content}. Use this OTP to complete your signup process.`;
    } else if (type === 'link') {
        subject = 'Password Reset Request';
        text = `Click on the following link to reset your password: ${content}`;
    }

    const mailOptions = {
        from: Mailer.user,
        to: email,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false };
    }
}

export default sendEmail;
