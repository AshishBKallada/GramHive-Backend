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
exports.AdminController = void 0;
class AdminController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onGoogleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, isSignup } = req.body;
            try {
                const result = yield this.interactor.googleAuthenticate({ token, isSignup });
                res.json(result);
            }
            catch (error) {
                console.error(error);
                if (error.message.includes('User already exists')) {
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
    onLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('ADMIN ROUTER ', req.body);
                const { email, password } = req.body;
                const { admin, token } = yield this.interactor.login({ email, password });
                if (admin) {
                    console.log('adminController:', admin, token);
                    res.status(200).json({ message: 'Login successful', admin: admin, token: token });
                }
                else {
                    res.status(401).send('Invalid username or password');
                }
            }
            catch (e) {
                console.error('Error during login:', e);
                res.status(500).send('Internal server error');
            }
        });
    }
    onGetUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('111');
                const users = yield this.interactor.getAllUsers();
                // console.log('AdminROuter users:', users);
                res.json(users);
            }
            catch (e) {
                console.error('Error fetching user data:', e);
                res.status(500).send('Internal server error');
            }
        });
    }
    onBlockUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                console.log('Block user backend////////////////////////////////////////////////////////////////////', userId);
                const isBlocked = yield this.interactor.blockUser(userId);
                console.log(isBlocked, '................................................');
                if (isBlocked.success) {
                    res.status(200).json({ message: `User with ID ${userId} has been blocked successfully.`, status: isBlocked.status });
                }
            }
            catch (e) {
                console.error('Error blocking user:', e);
                res.status(500).json({ error: 'An error occurred while blocking the user.' });
            }
        });
    }
    onGetReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = req.params.filter;
            try {
                const reviews = yield this.interactor.getReviews(filter);
                return res.status(200).json(reviews);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(500).json({ error: 'An unknown error occurred' });
            }
        });
    }
    onPostReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield this.interactor.getPostReports();
                return res.status(200).json(reports);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(500).json({ error: 'An unknown error occurred' });
            }
        });
    }
    onPostBan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('1');
                const postId = req.params.postId;
                const { success, message } = yield this.interactor.PostBan(postId);
                return res.status(200).json({ success, message });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(500).json({ error: 'An unknown error occurred' });
            }
        });
    }
    onUserReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userReports = yield this.interactor.userReports();
                console.log('user', userReports);
                return res.status(200).json(userReports);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({ error: error.message });
                }
                return res.status(500).json({ error: 'An unknown error occurred' });
            }
        });
    }
    onGetTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield this.interactor.getTransactions();
                console.log('transactions', transactions);
                return res.status(200).json(transactions);
            }
            catch (error) {
                console.error('Error fetching transactions:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.AdminController = AdminController;
