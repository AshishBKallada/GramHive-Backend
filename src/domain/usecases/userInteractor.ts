import { generateAccessToken } from '../../functions/accessToken-generator';
import { generateRefreshToken } from '../../functions/refreshToken-generator';
import { generateRandomUsername } from '../../functions/username-generator';
import { SignupData } from '../entities/SignupData';
import { GoogleAuthResponse, GooglePayload } from '../entities/googleauth';
import { Token } from '../entities/tokens';
import { User } from '../entities/user';
import { IMailer } from '../interfaces/external-lib/IMailer';
import { ITokenRepository } from '../interfaces/repositories/token-repository';
import { UserRepository } from '../interfaces/repositories/user-repository';
import { UserInteractor } from '../interfaces/usecases/userInteractor';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client("502311807627-9l05a15r47opss1cehl23s5sdn976dmv.apps.googleusercontent.com");

export class UserInteractorImpl implements UserInteractor {

    constructor(private readonly Repository: UserRepository, private readonly tokenRepository: ITokenRepository, private readonly mailer: IMailer) { }

    async googleAuth(token: string, isSignup: boolean): Promise<GoogleAuthResponse> {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "502311807627-9l05a15r47opss1cehl23s5sdn976dmv.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload() as GooglePayload;
        const { sub, email, name, picture } = payload;

        let user = await this.Repository.findByGoogleId(sub);

        if (isSignup) {
            if (user) {
                throw new Error('User already exists. Please log in instead.');
            } else {
                const username = await generateRandomUsername(name);
                user = await this.Repository.create({ googleId: sub, username, email, name, image: picture, authSource: 'google' });
                console.log('user created', user);

            }
        } else {
            if (!user) {
                throw new Error('No account exists with this Google account. Please sign up first.');
            }
        }

        const accessToken: string = await generateAccessToken(user);
        const refreshToken: string = await generateRefreshToken(user);
        const tokens = {accessToken: accessToken, refreshToken: refreshToken}
        return { user, tokens };
    }


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
                const updateOTP = await this.Repository.updateOTP(emailId, otp);
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

    async updateLocation(userId: string, latitude: number, longitude: number): Promise<boolean> {
        console.log('caleeeeeeeeee2 ');

        try {
            const success = await this.Repository.updateLocation(userId, latitude, longitude);
            return success;
        } catch (error) {
            console.error('Error fetching searched user data:', error);
            return false;
        }

    }
    async getLocations(userId: string): Promise<User[] | null> {
        try {
            const users = await this.Repository.getLocations(userId);
            return users;
        } catch (error) {
            console.error('Error fetching searched user data:', error);
            return null;
        }
    }

    async getSuggestions(userId: string): Promise<User[] | null> {
        try {
            const users = await this.Repository.getSuggestedUsers(userId);
            return users;
        } catch (error) {
            console.error('Error fetching suggested users data:', error);
            return null;
        }
    }

    async checkEmail(email: string): Promise<boolean> {
        try {
            const success = await this.Repository.checkEmail(email);
            return success;
        } catch (error) {
            throw error;
        }
    }

    async getTokens(refreshToken: string): Promise<Token> {        
        const decoded = await this.tokenRepository.verifyRefreshToken(refreshToken);

        const user = await this.Repository.findById(decoded.userId);
        
        if (!user) {
            throw new Error('User not found');
        }
        return this.tokenRepository.generateTokens(user);
    }

}




