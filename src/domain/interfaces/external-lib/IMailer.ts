export interface IMailer{
    sendMail(email: string): Promise<{ otp: string, success: boolean }>;
    sendPasswordResetLink(email: string,token:string): Promise<boolean>;
}