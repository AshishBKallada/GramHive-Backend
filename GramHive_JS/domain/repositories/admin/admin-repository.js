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
exports.AdminRepositoryImpl = void 0;
const admin_1 = __importDefault(require("../../../data/data-sources/mongodb/models/admin"));
const user_1 = __importDefault(require("../../../data/data-sources/mongodb/models/user"));
const jwt = require('jsonwebtoken');
class AdminRepositoryImpl {
    constructor() {
        this.generateToken = (email) => {
            return jwt.sign({ adminId: email }, 'shaantha_UK', { expiresIn: '1h' });
        };
    }
    findByCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Admin Repository: findByCredentials', email, password);
            const admin = yield admin_1.default.findOne({ email: email });
            let token = null;
            if (admin) {
                console.log('admin valid');
                token = this.generateToken(admin.email);
            }
            return { admin: admin ? admin.toObject() : null, token: token };
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.find({});
                // console.log('adminrepository',users);
                return users.map(user => user.toObject());
            }
            catch (error) {
                console.error('Error fetching users:', error);
                throw error;
            }
        });
    }
    blockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2', userId);
            try {
                const user = yield user_1.default.findById(userId);
                if (!user) {
                    console.log('User not found.');
                    return { success: false, status: 'User not found' };
                }
                user.isBan = !user.isBan;
                yield user.save();
                const status = user.isBan ? 'banned' : 'unbanned';
                console.log(`User ${user.username} has been ${status}.`);
                return { success: true, status };
            }
            catch (e) {
                console.error('Error blocking user:', e);
                return { success: false, status: 'An error occurred' };
            }
        });
    }
}
exports.AdminRepositoryImpl = AdminRepositoryImpl;
