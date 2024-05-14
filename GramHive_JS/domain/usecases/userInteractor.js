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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractorImpl = void 0;
const refreshToken_generator_1 = require("../../functions/refreshToken-generator");
class UserInteractorImpl {
    constructor(Repository, mailer) {
        this.Repository = Repository;
        this.mailer = mailer;
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
                const newUser = {
                    username: userData.username,
                    name: userData.name,
                    password: userData.password,
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
}
exports.UserInteractorImpl = UserInteractorImpl;
