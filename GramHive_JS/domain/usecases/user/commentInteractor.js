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
exports.commentInteractorImpl = void 0;
class commentInteractorImpl {
    constructor(Repository) {
        this.Repository = Repository;
    }
    addComment(postId, comment, author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isCommentAdded = yield this.Repository.addComment(postId, comment, author);
                if (isCommentAdded) {
                    return true;
                }
                else {
                    false;
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    getComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.Repository.getComments(postId);
                return comments;
            }
            catch (error) {
                console.error('Error getting comments:', error);
                return null;
            }
        });
    }
    addCommentReply(postId, commentId, reply, author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isCommentReplyAdded = yield this.Repository.addCommentReply(postId, commentId, reply, author);
                if (isCommentReplyAdded) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error getting likes:', error);
                return false;
            }
        });
    }
}
exports.commentInteractorImpl = commentInteractorImpl;
