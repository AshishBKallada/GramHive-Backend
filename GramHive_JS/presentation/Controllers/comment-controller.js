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
exports.CommentController = void 0;
class CommentController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    addComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const { comment, author } = req.body;
                console.log(comment, '4');
                const notification = yield this.interactor.addComment(postId, comment, author);
                if (notification) {
                    return res.status(200).json({ success: true, message: 'User was followed successfully', notification });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to follow the user' });
                }
            }
            catch (error) {
                return res.status(404).json({ success: false, message: 'internal server error' });
            }
        });
    }
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                console.log('1', postId);
                const comments = yield this.interactor.getComments(postId);
                if (comments) {
                    return res.status(200).json({ success: true, comments });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to get comments' });
                }
            }
            catch (error) {
                console.error('Internal server error:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    addCommentReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId, commentId } = req.params;
                const { reply, author } = req.body;
                console.log(postId, author, reply, commentId, '4');
                const isCommentReplyAdded = yield this.interactor.addCommentReply(postId, commentId, reply, author);
                if (isCommentReplyAdded) {
                    return res.status(200).json({ success: true, message: 'Comment reply was added successfully' });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to add reply to the comment' });
                }
            }
            catch (error) {
                return res.status(404).json({ success: false, message: 'internal server error' });
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const commentId = req.params.commentId;
                const success = yield this.interactor.deleteComment(postId, commentId);
                if (success) {
                    return res.status(200).json({ success: true, message: 'Comment was deleted successfully' });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to delete comment' });
                }
            }
            catch (error) {
                return res.status(404).json({ success: false, message: error.message });
            }
        });
    }
    deleteCommentReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const commentId = req.params.commentId;
                const replyId = req.params.replyId;
                const success = yield this.interactor.deleteCommentReply(postId, commentId, replyId);
                if (success) {
                    console.log('COMMENT  REPlyDELETE CONTROLLER 2');
                    return res.status(200).json({ success: true, message: 'Comment was deleted successfully' });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to delete comment' });
                }
            }
            catch (error) {
                return res.status(404).json({ success: false, message: error.message });
            }
        });
    }
}
exports.CommentController = CommentController;
