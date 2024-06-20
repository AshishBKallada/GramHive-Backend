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
exports.UserInteractorImpl = void 0;
const accessToken_generator_1 = require("../../functions/accessToken-generator");
const refreshToken_generator_1 = require("../../functions/refreshToken-generator");
const username_generator_1 = require("../../functions/username-generator");
const crypto_1 = __importDefault(require("crypto"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client("502311807627-9l05a15r47opss1cehl23s5sdn976dmv.apps.googleusercontent.com");
class UserInteractorImpl {
    constructor(Repository, tokenRepository, mailer) {
        this.Repository = Repository;
        this.tokenRepository = tokenRepository;
        this.mailer = mailer;
    }
    googleAuth(token, isSignup) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: "502311807627-9l05a15r47opss1cehl23s5sdn976dmv.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
            const { sub, email, name, picture } = payload;
            let user = yield this.Repository.findByGoogleId(sub);
            if (isSignup) {
                if (user) {
                    throw new Error('User already exists. Please log in instead.');
                }
                else {
                    const username = yield (0, username_generator_1.generateRandomUsername)(name);
                    user = yield this.Repository.create({ googleId: sub, username, email, name, image: picture, authSource: 'google' });
                    console.log('user created', user);
                }
            }
            else {
                if (!user) {
                    throw new Error('No account exists with this Google account. Please sign up first.');
                }
            }
            const accessToken = yield (0, accessToken_generator_1.generateAccessToken)(user);
            const refreshToken = yield (0, refreshToken_generator_1.generateRefreshToken)(user);
            const tokens = { accessToken: accessToken, refreshToken: refreshToken };
            return { user, tokens };
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, message, token } = yield this.Repository.findByCredentials(credentials.username, credentials.password);
                const refreshToken = user ? yield (0, refreshToken_generator_1.generateRefreshToken)(user) : '';
                return { user, message, token, refreshToken };
            }
            catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        });
    }
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('UserService: signup');
                console.log('New user data:', userData);
                const hashedPassword = crypto_1.default.createHash('sha256').update(userData.password).digest('hex').slice(0, 16);
                console.log('Hashed Password:', hashedPassword);
                const newUser = {
                    username: userData.username,
                    name: userData.name,
                    password: hashedPassword,
                    email: userData.email,
                    image: userData.image
                };
                console.log(newUser);
                const { user, token } = yield this.Repository.save(newUser);
                console.log('Usecase returned', user, token);
                return { user, token };
            }
            catch (error) {
                console.error('Error during signup:', error);
                throw error;
            }
        });
    }
    sendMail(signupData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2', signupData);
            const email = signupData.email;
            const userExists = yield this.Repository.userExists(email);
            if (userExists) {
                return { userExists: true, isMailSent: false };
            }
            try {
                const { otp, success } = yield this.mailer.sendMail(email);
                if (success) {
                    const saveToDB = yield this.Repository.saveToDB(signupData, otp);
                    return { userExists: false, isMailSent: true };
                }
                else {
                    return { userExists: false, isMailSent: false };
                }
            }
            catch (error) {
                console.error('Error sending email:', error);
                return { userExists: false, isMailSent: false };
            }
        });
    }
    resendMail(emailId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, success } = yield this.mailer.sendMail(emailId);
                if (success) {
                    const updateOTP = yield this.Repository.updateOTP(emailId, otp);
                    return updateOTP;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw new Error(error);
            }
        });
    }
    verifyotp(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUser = yield this.Repository.verifyOtp(otp);
                if (isUser) {
                    console.log('4', isUser);
                    const { user, token } = yield this.Repository.save(isUser);
                    if (user && token) {
                        return { success: true, user, token };
                    }
                }
                return { success: false };
            }
            catch (error) {
                console.error('Error verifying OTP:', error);
                return { success: false };
            }
        });
    }
    getSearchData(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('2');
                const users = yield this.Repository.getFilteredUsers(filter);
                if (users) {
                    console.log(users);
                    return users;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error('Error fetching filtered users:', error);
                return null;
            }
        });
    }
    getSearchUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, followers, following } = yield this.Repository.getSearchuser(userId);
                if (user) {
                    console.log('User data fetched:', user);
                    return { user, followers, following };
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error('Error fetching searched user data:', error);
                return null;
            }
        });
    }
    updateLocation(userId, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('caleeeeeeeeee2 ');
            try {
                const success = yield this.Repository.updateLocation(userId, latitude, longitude);
                return success;
            }
            catch (error) {
                console.error('Error fetching searched user data:', error);
                return false;
            }
        });
    }
    getLocations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.Repository.getLocations(userId);
                return users;
            }
            catch (error) {
                console.error('Error fetching searched user data:', error);
                return null;
            }
        });
    }
    getSuggestions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.Repository.getSuggestedUsers(userId);
                return users;
            }
            catch (error) {
                console.error('Error fetching suggested users data:', error);
                return null;
            }
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.Repository.checkEmail(email);
                return success;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getTokens(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = yield this.tokenRepository.verifyRefreshToken(refreshToken);
            const user = yield this.Repository.findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }
            return this.tokenRepository.generateTokens(user);
        });
    }
}
exports.UserInteractorImpl = UserInteractorImpl;
