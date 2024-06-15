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
exports.ReportInteractorImpl = void 0;
class ReportInteractorImpl {
    constructor(Repository) {
        this.Repository = Repository;
    }
    reportContent(user, content) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('222');
            if (!user) {
                throw new Error('User is required');
            }
            if (!content) {
                throw new Error('Valid content is required');
            }
            try {
                yield this.Repository.saveReportContent(user, content);
                return true;
            }
            catch (error) {
                console.error('Error reporting content:', error);
                throw new Error('Internal server error');
            }
        });
    }
    reportUser(user, reportedUser, category, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                throw new Error('User is required');
            }
            if (!reportedUser) {
                throw new Error('Reported User is required');
            }
            try {
                const isAlreadyReported = yield this.Repository.isUserReported(user, reportedUser);
                if (!isAlreadyReported) {
                    return yield this.Repository.saveReportUser(user, reportedUser, category, reason);
                }
                else {
                    console.warn('User has already reported this user.');
                    return false;
                }
            }
            catch (error) {
                console.error('Error reporting user:', error);
                throw new Error('Internal server error');
            }
        });
    }
    reportPost(user, post, category, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isAlreadyReported = yield this.Repository.isPostReported(user, post);
                if (!isAlreadyReported) {
                    console.log('2.1');
                    return yield this.Repository.saveReportPost(user, post, category, reason);
                }
                else {
                    console.log('2.2');
                    console.warn('User has already reported this post.');
                    return false;
                }
            }
            catch (error) {
                console.error('Error reporting post:', error);
                throw new Error('Internal server error');
            }
        });
    }
    reportFeedback(postId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isFeedbackAlreadyAdded = yield this.Repository.checkIfFeedbackExists(postId);
                if (isFeedbackAlreadyAdded) {
                    return { message: 'Feedback already submitted for this post' };
                }
                const success = yield this.Repository.AddreportFeedback(postId, reason);
                return success;
            }
            catch (error) {
                console.error('Error reporting post:', error);
                throw new Error('Internal server error');
            }
        });
    }
}
exports.ReportInteractorImpl = ReportInteractorImpl;
