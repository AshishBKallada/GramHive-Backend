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
exports.AdminInteractorImpl = void 0;
class AdminInteractorImpl {
    constructor(Repository) {
        this.Repository = Repository;
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { admin, token } = yield this.Repository.findByCredentials(credentials.email, credentials.password);
                return { admin, token };
            }
            catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.Repository.getAllUsers();
                return users;
            }
            catch (error) {
                console.error('Error fetching all users:', error);
                throw error;
            }
        });
    }
    blockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('1', userId);
            try {
                const isBlocked = yield this.Repository.blockUser(userId);
                console.log(isBlocked);
                const status = isBlocked.status;
                console.log('usecaseImpl', isBlocked.status);
                return { success: true, status };
            }
            catch (e) {
                console.error('Error blocking user:', e);
                return { success: false, status: 'An error occurred' };
            }
        });
    }
}
exports.AdminInteractorImpl = AdminInteractorImpl;
