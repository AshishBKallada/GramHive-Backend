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
const user_1 = __importDefault(require("../../data/data-sources/mongodb/models/user"));
const jwt = require('jsonwebtoken');
class UserRepositoryImpl {
    findByCredentials(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('USER REPOSITORY ------------------');
            const user = yield user_1.default.findOne({
                $or: [
                    { email: username, password: password },
                    { username: username, password: password }
                ]
            });
            let token = null;
            if (user) {
                console.log('User mwonu', user);
                token = this.generateToken(user);
                console.log('Token', token);
            }
            return { user: user ? user.toObject() : null, token };
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Repository');
            console.log(user);
            const newUser = new user_1.default(user);
            yield newUser.save();
            let token = this.generateToken(user);
            console.log('Token', token);
            return { user: newUser ? newUser.toObject() : null, token };
        });
    }
    generateToken(user) {
        return jwt.sign({ userId: user.email }, 'thadavil__aanu', { expiresIn: '1h' });
    }
    updateProfile(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Repo', newData);
                console.log('image', newData.image);
                const userId = newData.userId;
                yield user_1.default.findByIdAndUpdate(userId, newData);
                return { success: true };
            }
            catch (error) {
                console.error('Error updating user profile:', error);
                return { success: false };
            }
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
