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
    onGoogleAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, isSignup } = req.body;
                console.log(token, isSignup);
                const result = yield this.interactor.googleAuth(token, isSignup);
                console.log('00000', result);
                res.json(result);
            }
            catch (error) {
                console.error(error);
                if (error.message.includes('User already exists')) {
                    console.log('33333333333333333');
                    res.status(400).json({ message: error.message });
                }
                else if (error.message.includes('No account exists')) {
                    res.status(404).json({ message: error.message });
                }
                else {
                    res.status(401).json({ message: 'Invalid token' });
                }
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Login Controller');
                console.log('logindata', req.body);
                const { username, password } = req.body;
                console.log(username, password);
                const { user, message, token, refreshToken } = yield this.interactor.login({ username: username, password });
                if (user) {
                    console.log('userController:', user, 'Token', token, 'refreshToken', refreshToken);
                    res.status(200).json({ message: 'Login successful', user, token: token, refreshToken, status: true });
                }
                else {
                    console.log('1111', message);
                    res.status(302).json({ message: message, status: false });
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
                const { user, token } = yield this.interactor.signup({ username, name, password, email, image: image ? image : 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' });
                console.log('returned ' + user, token);
                res.status(200).json({ message: 'Signup successful', user, token, status: true });
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
    resendMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailId = req.params.emailId;
                const success = yield this.interactor.resendMail(emailId);
                if (success) {
                    console.log('SECCESS');
                    res.status(200).json({ success: true, message: 'Email sent successfully.' });
                }
                else {
                    res.status(302).json({ success: false, message: 'Failed to send email.' });
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
                const { user, success, token } = yield this.interactor.verifyotp(otp);
                if (success) {
                    console.log('7', token);
                    res.status(200).json({ success: true, message: 'OTP verified successfully.', user, token, status: true });
                }
                else {
                    res.status(201).json({ success: false, message: 'Invalid OTP.' });
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
    onUpdatelocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { latitude, longitude } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const success = yield this.interactor.updateLocation(userId, latitude, longitude);
                if (success) {
                    return res.status(200).json({ success: true, message: 'User location updated successfully.' });
                }
                else {
                    return res.status(500).json({ success: false, message: 'Failed to update user location' });
                }
            }
            catch (error) {
                console.error('Error retrieving user data:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    onGetLocations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const users = yield this.interactor.getLocations(userId);
                return res.status(200).json({ success: true, message: 'User location updated successfully.', users });
            }
            catch (error) {
                console.error('Error retrieving user data:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    onGetSuggestions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const users = yield this.interactor.getSuggestions(userId);
                return res.status(200).json({ success: true, message: 'Suggested users data fetched successfully.', users });
            }
            catch (error) {
                console.error('Error retrieving suggested users:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    onCheckEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const success = yield this.interactor.checkEmail(email);
                console.log('user exists', success);
                return res.status(200).json({ success });
            }
            catch (error) {
                console.error('Error retrieving suggested users:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    onRefreshTokens(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                const tokens = yield this.interactor.getTokens(refreshToken);
                res.json(tokens);
            }
            catch (error) {
                res.status(401).json({ message: error.message });
            }
        });
    }
    onForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('called reset 88888mwonu');
            try {
                const { email } = req.body;
                if (!email) {
                    return res.status(400).json({ message: 'Email is required' });
                }
                const success = yield this.interactor.forgotPass(email);
                if (success) {
                    console.log('33333');
                    res.json(success);
                }
                else {
                    res.status(500).json({ message: 'Failed to send password reset link' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });
    }
    onResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, newPassword } = req.body;
            try {
                const success = yield this.interactor.resetPassword(token, newPassword);
                console.log('contorller', success);
                res.json(success);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });
    }
}
exports.userController = userController;
