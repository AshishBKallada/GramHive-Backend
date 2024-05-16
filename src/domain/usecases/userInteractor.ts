import { generateRefreshToken } from '../../functions/refreshToken-generator';
import { SignupData } from '../entities/SignupData';
import { User } from '../entities/user';
import { IMailer } from '../interfaces/external-lib/IMailer';
import { UserRepository } from '../interfaces/repositories/user-repository';
import { UserInteractor } from '../interfaces/usecases/userInteractor';
import crypto from 'crypto';

export class UserInteractorImpl implements UserInteractor {

    constructor(private readonly Repository: UserRepository, private readonly mailer: IMailer) { }

    async login(credentials: { username: string, password: string }): Promise<{ user: User | null, message: string, token: string | null, refreshToken: string | null }> {
        try {

            const { user, message, token } = await this.Repository.findByCredentials(credentials.username, credentials.password);
            const refreshToken = user ? await generateRefreshToken(user) : ''
            return { user, message, token, refreshToken };
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    async signup(userData: { username: string, name: string, password: string, email: string, image: string }): Promise<{ user: User | null, token: string | null }> {
        try {
            console.log('UserService: signup');
            console.log('New user data:', userData);

            const hashedPassword = crypto.createHash('sha256').update(userData.password).digest('hex').slice(0, 16);
            console.log('Hashed Password:', hashedPassword);

            const newUser: User = {
                username: userData.username,
                name: userData.name,
                password: hashedPassword,
                email: userData.email,
                image: userData.image
            };
            console.log(newUser);

            const { user, token } = await this.Repository.save(newUser);
            console.log('Usecase returned', user, token);
            return { user, token };
        } catch (error) {
            console.error('Error during signup:', error);
            throw error;
        }
    }

    async sendMail(signupData: SignupData): Promise<{ userExists: boolean, isMailSent: boolean }> {
        console.log('2', signupData)
        const email = signupData.email;
        const userExists = await this.Repository.userExists(email);
        if (userExists) {
            return { userExists: true, isMailSent: false };
        }

        try {
            const { otp, success } = await this.mailer.sendMail(email);
            if (success) {
                const saveToDB = await this.Repository.saveToDB(signupData, otp)
                return { userExists: false, isMailSent: true };
            } else {
                return { userExists: false, isMailSent: false };
            }
        } catch (error) {
            console.error('Error sending email:', error);
            return { userExists: false, isMailSent: false };
        }
    }

    async resendMail(emailId: string): Promise<boolean> {
        try {
            const { otp, success } = await this.mailer.sendMail(emailId);
            if (success) {
                const updateOTP = await this.Repository.updateOTP(emailId,otp);
                return updateOTP;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error(error);
        }

    }


    async verifyotp(otp: string): Promise<{ success: boolean, user?: User, token?: string }> {
        try {

            const isUser = await this.Repository.verifyOtp(otp);

            if (isUser) {
                console.log('4', isUser);
                const { user, token } = await this.Repository.save(isUser);

                if (user && token) {
                    return { success: true, user, token };
                }
            }

            return { success: false };
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return { success: false };
        }
    }


    async getSearchData(filter: string): Promise<User[] | null> {
        try {
            console.log('2');

            const users = await this.Repository.getFilteredUsers(filter);
            if (users) {
                console.log(users);

                return users;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching filtered users:', error);
            return null;
        }
    }

    async getSearchUser(userId: string): Promise<{ user: User | null; followers: User[]; following: User[]; } | null> {
        try {
            const { user, followers, following } = await this.Repository.getSearchuser(userId);
            if (user) {
                console.log('User data fetched:', user);
                return { user, followers, following };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching searched user data:', error);
            return null;
        }
    }


}