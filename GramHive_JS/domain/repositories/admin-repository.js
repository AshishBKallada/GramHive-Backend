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
const admin_1 = __importDefault(require("../../data/data-sources/mongodb/models/admin"));
const user_1 = __importDefault(require("../../data/data-sources/mongodb/models/user"));
const report_1 = __importDefault(require("../../data/data-sources/mongodb/models/report"));
const post_1 = __importDefault(require("../../data/data-sources/mongodb/models/post"));
const ad_1 = __importDefault(require("../../data/data-sources/mongodb/models/ad"));
const jwt = require('jsonwebtoken');
class AdminRepositoryImpl {
    constructor() {
        this.generateToken = (email) => {
            return jwt.sign({ adminId: email }, 'shaantha_UK', { expiresIn: '1h' });
        };
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_1.default.findOne({ email });
            return admin;
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
    getReviews(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let reviews;
                console.log(filter);
                switch (filter) {
                    case 'all':
                        reviews = yield report_1.default.find({ type: 'content' }).populate('author', 'username name image');
                        break;
                    case 'saved':
                        reviews = yield report_1.default.find({ type: 'content', isSaved: true }).populate('author', 'username name image');
                        break;
                    case 'today':
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const tomorrow = new Date(today);
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        reviews = yield report_1.default.find({
                            type: 'content',
                            isSaved: true,
                            createdAt: {
                                $gte: today,
                                $lt: tomorrow
                            }
                        }).populate('author', 'username name image');
                        break;
                    default:
                        throw new Error('Invalid filter');
                }
                console.log(reviews);
                return reviews;
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
                return yield report_1.default.find({ type: 'post' })
                    .populate({
                    path: 'reportedPost',
                    populate: {
                        path: 'userId',
                        select: 'username name image'
                    }
                })
                    .populate({
                    path: 'users.author',
                    select: 'username name image'
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch post reports: ${error.message}`);
                }
                throw new Error('Failed to fetch post reports due to an unknown error');
            }
        });
    }
    postBan(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('3', postId);
                const post = yield post_1.default.findById(postId);
                if (!post) {
                    throw new Error('Post not found');
                }
                const isBanned = post.isBan;
                post.isBan = !isBanned;
                yield post.save();
                return post.isBan ? 'Post has been banned' : 'Post has been unbanned';
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
                const reports = yield report_1.default.find({ type: 'user' })
                    .populate('reportedUser', 'username name image')
                    .populate({
                    path: 'users.author', select: 'username name image'
                });
                console.log('reports', reports);
                return reports;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch reports: ${error.message}`);
                }
                throw new Error('Failed to fetch reports due to an unknown error');
            }
        });
    }
    getTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield ad_1.default.find({}).populate('user', 'username name image');
                if (!transactions) {
                    throw new Error('Database query returned null');
                }
                return transactions;
            }
            catch (error) {
                console.error('Error in TransactionsRepository:', error);
                throw error;
            }
        });
    }
}
exports.AdminRepositoryImpl = AdminRepositoryImpl;
