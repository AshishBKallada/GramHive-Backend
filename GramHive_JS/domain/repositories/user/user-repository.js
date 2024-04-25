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
exports.UserRepositoryImpl = void 0;
const user_1 = __importDefault(require("../../../data/data-sources/mongodb/models/user"));
const otp_1 = __importDefault(require("../../../data/data-sources/mongodb/models/otp"));
const followers_1 = __importDefault(require("../../../data/data-sources/mongodb/models/followers"));
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
class UserRepositoryImpl {
    constructor() {
        this.generateRandomOTP = (length) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    }
    findByCredentials(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('USER REPOSITORY ------------------');
            console.log(username, password);
            const user = yield user_1.default.findOne({
                $or: [
                    { email: username },
                    { username: username }
                ]
            });
            console.log('user', user);
            let message = '';
            let token = null;
            if (!user) {
                message = 'Invalid User';
            }
            else {
                if (password !== user.password) {
                    console.log('Invalid password');
                    message = 'Invalid password';
                }
                else {
                    token = this.generateToken(user);
                    console.log('Token', token);
                }
            }
            if (user && !message) {
                return { user: user.toObject(), message, token };
            }
            else {
                console.log('message', message);
                return { user: null, message, token };
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Repository');
            console.log(user);
            const { name, email, username, password, image = 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' } = user;
            const newUser = new user_1.default({ name, email, username, password, image });
            yield newUser.save();
            let token = this.generateToken(user);
            console.log('Token', token);
            return { user: newUser ? newUser.toObject() : null, token };
        });
    }
    generateToken(user) {
        return jwt.sign({ userId: user.email }, 'thadavil__aanu', { expiresIn: '7h' });
    }
    userExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('3', email);
            const userExists = yield user_1.default.findOne({ email: email });
            return !!userExists;
        });
    }
    sendMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('4', email);
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: 'ashercode4u@gmail.com',
                    pass: 'grgf nmsi qsde wmli',
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            return new Promise((resolve, reject) => {
                const otp = this.generateRandomOTP(4);
                console.log('OTP', otp);
                const mailOptions = {
                    from: 'ashercode@gmail.com',
                    to: email,
                    subject: 'hey this is a signup Verification mail from GramHive',
                    text: `Your otp is ${otp}. Use this OTP to complete your signup process`,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email: ", error);
                        reject({ success: false });
                    }
                    else {
                        console.log("Email sent: ", info.response);
                        resolve({ otp: otp, success: true });
                    }
                });
            });
        });
    }
    saveToDB(signupData, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, username, password } = signupData;
                const isAddedToDB = yield otp_1.default.create({ name: name, email: email, username: username, password: password, otp: otp });
                return isAddedToDB ? true : false;
            }
            catch (error) {
                console.error("Error saving data to database:", error);
                return false;
            }
        });
    }
    verifyOtp(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('3');
                const user = yield otp_1.default.findOne({ otp: otp });
                console.log('user', user);
                return user ? user : null;
            }
            catch (error) {
                console.error('Error verifying OTP from database:', error);
                return null;
            }
        });
    }
    // async addSignupUser(otp: string): Promise<boolean> {
    //     try {
    //         console.log('5');
    //         const user = await otpModel.findOne({ otp: otp });
    //         if (user) {
    //             const { name, email, username, password } = user;
    //             const addSignupUser = await userModel.create({ name, email, username, password });
    //             console.log('6',addSignupUser);
    //             return addSignupUser ? true : false;
    //         } else {
    //             return false; 
    //         }
    //     } catch (error) {
    //         console.error('Error adding user to database:', error);
    //         return false;
    //     }
    // }
    getFilteredUsers(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('3', filter);
                const userData = yield user_1.default.find({ $or: [{ username: { $regex: new RegExp(filter, 'i') } }, { name: { $regex: new RegExp(filter, 'i') } }] });
                const users = userData.map(({ _id, username, name, image }) => ({ _id, username, name, image }));
                console.log('Users found', users);
                return users ? users : null;
            }
            catch (error) {
                console.error('Error retrieving posts:', error);
                return null;
            }
        });
    }
    getSearchuser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(userId).select('-password');
                const followersData = yield followers_1.default.find({ follower_id: userId });
                const followingData = yield followers_1.default.find({ followed_id: userId });
                console.log('user', user);
                console.log('followers:', followersData);
                console.log('following:', followingData);
                const followers_ids = followersData.map((follower) => follower.followed_id);
                console.log('followers_ids:', followers_ids);
                const following_ids = followingData.map((followed) => followed.follower_id);
                console.log('following_ids:', following_ids);
                const followers = yield user_1.default.find({ _id: { $in: followers_ids } });
                const following = yield user_1.default.find({ _id: { $in: following_ids } });
                if (user) {
                    return { user, followers, following };
                }
                else {
                    return { user: null, followers: [], following: [] };
                }
            }
            catch (error) {
                console.error('Error retrieving searched user data:', error);
                return { user: null, followers: [], following: [] };
            }
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
