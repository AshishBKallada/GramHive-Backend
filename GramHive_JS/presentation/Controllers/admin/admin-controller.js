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
}
exports.AdminController = AdminController;
