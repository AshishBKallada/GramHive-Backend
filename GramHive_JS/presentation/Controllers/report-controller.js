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
exports.ReportController = void 0;
class ReportController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onReportContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { content } = req.body;
            if (!user) {
                return res.status(400).json({ error: 'User not authenticated' });
            }
            if (!content) {
                return res.status(400).json({ error: 'Content is required' });
            }
            try {
                const success = yield this.interactor.reportContent(user, content);
                return res.status(200).json({ success });
            }
            catch (error) {
                console.error('Error reporting content:', error.message);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    onReportUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const reportedUser = req.params.Id;
            const { category, reason } = req.body;
            if (!user) {
                return res.status(400).json({ error: 'User not authenticated' });
            }
            if (!reportedUser) {
                return res.status(400).json({ error: 'Reported user is required' });
            }
            try {
                const success = yield this.interactor.reportUser(user, reportedUser, category, reason);
                return res.status(success ? 200 : 201).json({ success });
            }
            catch (error) {
                console.error('Error in onReportUser:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    onReportPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const postId = req.params.Id;
            const { category, reason } = req.body;
            if (!user) {
                return res.status(400).json({ error: 'User not authenticated' });
            }
            if (!postId) {
                return res.status(400).json({ error: 'PostId is required' });
            }
            try {
                const success = yield this.interactor.reportPost(user, postId, category, reason);
                return res.status(success ? 200 : 201).json({ success });
            }
            catch (error) {
                console.error('Error in onReportPost:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    onReportFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId, reason } = req.body;
            try {
                const feedbackResult = yield this.interactor.reportFeedback(postId, reason);
                if (typeof feedbackResult === 'boolean' && feedbackResult) {
                    return res.status(201).json({ success: true });
                }
                else if (typeof feedbackResult === 'object' && feedbackResult.message) {
                    return res.status(203).json({ message: feedbackResult.message });
                }
                else {
                    throw new Error('Unexpected response from reportFeedback');
                }
            }
            catch (error) {
                console.error('Error in onReportFeedback:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.ReportController = ReportController;
