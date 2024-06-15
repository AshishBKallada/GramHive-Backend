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
exports.ReportReporsitoryImpl = void 0;
const report_1 = __importDefault(require("../../data/data-sources/mongodb/models/report"));
const post_1 = __importDefault(require("../../data/data-sources/mongodb/models/post"));
class ReportReporsitoryImpl {
    saveReportContent(user, content) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('333');
            try {
                yield report_1.default.create({ author: user, type: 'content', content: content });
                return true;
            }
            catch (error) {
                console.error('Error saving report content:', error);
                throw new Error('Failed to save report content');
            }
        });
    }
    isUserReported(user, reportedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield report_1.default.findOne({
                    author: user,
                    type: 'user',
                    reportedUser: reportedUser
                });
                return report !== null;
            }
            catch (error) {
                console.error('Error checking if user is already reported:', error);
                throw new Error('Internal server error');
            }
        });
    }
    saveReportUser(user, reportedUser, category, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingReport = yield report_1.default.findOne({ type: 'user', reportedUser: reportedUser });
                if (existingReport) {
                    existingReport.users.push({ author: user, category, reason });
                    yield existingReport.save();
                }
                else {
                    yield report_1.default.create({
                        type: 'user',
                        reportedUser: reportedUser,
                        users: [{ author: user, category, reason }]
                    });
                }
                return true;
            }
            catch (error) {
                console.error('Error saving report user:', error);
                throw new Error('Failed to save report user');
            }
        });
    }
    isPostReported(user, post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('repo1 ');
                const report = yield report_1.default.findOne({
                    author: user,
                    type: 'post',
                    reportedPost: post
                });
                return report !== null;
            }
            catch (error) {
                console.error('Error checking if post is already reported:', error);
                throw new Error('Internal server error');
            }
        });
    }
    saveReportPost(user, post, category, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingReport = yield report_1.default.findOne({ type: 'post', reportedPost: post });
                if (existingReport) {
                    if (!existingReport.users) {
                        existingReport.users = [];
                    }
                    existingReport.users.push({ author: user, category, reason });
                    yield existingReport.save();
                    if (existingReport.users.length >= 3) {
                        yield post_1.default.findByIdAndUpdate(post, { $set: { isBan: true } }, { upsert: true });
                    }
                }
                else {
                    const newReport = yield report_1.default.create({
                        type: 'post',
                        reportedPost: post,
                        users: [{ author: user, category, reason }]
                    });
                    if (newReport.users.length >= 3) {
                        yield post_1.default.findByIdAndUpdate(post, { $set: { isBan: true } }, { upsert: true });
                    }
                }
                return true;
            }
            catch (error) {
                console.error('Error saving report on post:', error);
                throw new Error('Failed to save report on post');
            }
        });
    }
    checkIfFeedbackExists(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('reason', postId);
                const isfbAlreadyAdded = yield report_1.default.find({
                    response: { $ne: null },
                });
                if (isfbAlreadyAdded.length > 0) {
                    console.log('yes ');
                    return true;
                }
                else {
                    console.log('no ');
                    return false;
                }
            }
            catch (error) {
                console.error('Error checking if feedback was already submitted:', error);
                throw new Error('Error checking if feedback was already submitted');
            }
        });
    }
    AddreportFeedback(postId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield report_1.default.findOneAndUpdate({ reportedPost: postId }, { response: reason }, { new: true });
                if (report) {
                    console.log('success');
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error saving report on post:', error);
                throw new Error('Failed to save report on post');
            }
        });
    }
}
exports.ReportReporsitoryImpl = ReportReporsitoryImpl;
