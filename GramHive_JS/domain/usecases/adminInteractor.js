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
    constructor(Repository, authService) {
        this.Repository = Repository;
        this.authService = authService;
    }
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request;
            const admin = yield this.Repository.findByEmail(email);
            if (!admin) {
                throw new Error('Invalid email');
            }
            if (admin.password !== password) {
                throw new Error('Invalid password');
            }
            const token = this.authService.generateToken({ id: admin.id, email: admin.email });
            return { admin, token };
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
    getReviews(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.Repository.getReviews(filter);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch reviews: ${error.message}`);
                }
            }
        });
    }
    getPostReports() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.Repository.getPostReports();
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch reviews: ${error.message}`);
                }
            }
        });
    }
    PostBan(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('2');
                const message = yield this.Repository.postBan(postId);
                return { success: true, message };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to ban/unban post: ${error.message}`);
                }
                throw new Error('Failed to ban/unban post due to an unknown error');
            }
        });
    }
    userReports() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield this.Repository.userReports();
                return reports;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to ban/unban post: ${error.message}`);
                }
                throw new Error('Failed to ban/unban post due to an unknown error');
            }
        });
    }
    getTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield this.Repository.getTransactions();
                if (!transactions || transactions.length === 0) {
                    throw new Error('No transactions found');
                }
                return transactions;
            }
            catch (error) {
                console.error('Error in TransactionsInteractor:', error);
                throw error;
            }
        });
    }
    getDashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Repository.dashboardData();
                return data;
            }
            catch (error) {
                console.error('Error in getting dashboard details:', error);
                throw error;
            }
        });
    }
    getChartOne() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Repository.chartOneData();
                return data;
            }
            catch (error) {
                console.error('Error in getting chartOne details:', error);
                throw error;
            }
        });
    }
    getChartTwo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Repository.chartTwoData();
                return data;
            }
            catch (error) {
                console.error('Error in getting chartTwo details:', error);
                throw error;
            }
        });
    }
}
exports.AdminInteractorImpl = AdminInteractorImpl;
