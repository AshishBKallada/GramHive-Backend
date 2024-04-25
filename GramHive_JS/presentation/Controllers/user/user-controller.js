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
exports.userController = void 0;
class userController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Login Controller');
                console.log('logindata', req.body);
                const { username, password } = req.body;
                console.log(username, password);
                const { user, message, token } = yield this.interactor.login({ username: username, password });
                if (user) {
                    console.log('userController:', user, 'Token', token);
                    res.status(200).json({ message: 'Login successful', user, token: token });
                }
                else {
                    console.log('1111');
                    res.status(401).json({ message: message });
                }
            }
            catch (e) {
                console.error('Error during login:', e);
                res.status(500).send('Internal server error');
            }
        });
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, username, password, image } = req.body;
                console.log('1', req.body);
                const { user, token } = yield this.interactor.signup({ username, name, password, email, image: image ? image : 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' });
                console.log('returned ' + user, token);
                res.status(200).json({ message: 'Signup successful', user, token });
            }
            catch (e) {
                console.error('Error during signup:', e);
                res.status(500).send('Internal server error');
            }
        });
    }
    sendMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('1', req.body.email);
                const signupData = req.body;
                const { userExists, isMailSent } = yield this.interactor.sendMail(signupData);
                if (userExists) {
                    res.status(400).json({ success: false, message: 'User already exists.' });
                }
                else if (isMailSent) {
                    res.status(200).json({ success: true, message: 'Email sent successfully.' });
                }
                else {
                    res.status(500).json({ success: false, message: 'Failed to send email.' });
                }
            }
            catch (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    verifyOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('1');
                const { otp } = req.body;
                const { success, token } = yield this.interactor.verifyotp(otp);
                if (success) {
                    console.log('7', token);
                    res.status(200).json({ success: true, message: 'OTP verified successfully.', token });
                }
                else {
                    res.status(400).json({ success: false, message: 'Invalid OTP.' });
                }
            }
            catch (error) {
                console.error('Error verifying OTP:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('1');
                const filter = req.params.query;
                const searchResults = yield this.interactor.getSearchData(filter);
                if (searchResults) {
                    console.log('outer', searchResults);
                    return res.status(200).json(searchResults);
                }
                else {
                    return res.status(404).json({ message: 'Failed to retreive search data.' });
                }
            }
            catch (e) {
                console.error('Error retreiving posts', e);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    getSearchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                console.log('1', userId);
                const { user, followers, following } = yield this.interactor.getSearchUser(userId);
                if (user) {
                    console.log('--------------------------------', user, followers, following);
                    return res.status(200).json({ success: true, message: 'User data fetched successfully.', user, followers, following });
                }
                else {
                    return res.status(500).json({ success: false, message: 'Failed to retrieve searched user data' });
                }
            }
            catch (error) {
                console.error('Error retrieving user data:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
}
exports.userController = userController;
