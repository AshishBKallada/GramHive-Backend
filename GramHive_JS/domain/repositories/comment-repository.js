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
exports.CommentRepositoryImpl = void 0;
const reply_1 = __importDefault(require("../../data/data-sources/mongodb/models/reply"));
const post_1 = __importDefault(require("../../data/data-sources/mongodb/models/post"));
class CommentRepositoryImpl {
    addComment(postId, comment, author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('1');
                console.log(postId, comment, author);
                const post = yield post_1.default.findById(postId);
                if (!post) {
                    console.error('Post not found');
                    return false;
                }
                else {
                    console.log('post kitteetto');
                }
                const newComment = {
                    comment: comment,
                    author: author,
                    createdAt: new Date()
                };
                post.comments.push(newComment);
                const isCommentAdded = yield post.save();
                if (isCommentAdded) {
                    console.log('2');
                    return true;
                }
                else {
                    console.log('vayya');
                    return false;
                }
            }
            catch (error) {
                console.error('Error', error);
                return false;
            }
        });
    }
    getComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('2222', postId);
                const post = yield post_1.default
                    .findById(postId)
                    .populate({
                    path: 'comments',
                    populate: {
                        path: 'author replies.author',
                        model: 'User',
                    }
                });
                if (!post) {
                    console.error('Post not found');
                    return null;
                }
                return post.comments;
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
                console.log('444444444444444444', postId, commentId, reply, author);
                const post = yield post_1.default.findById(postId);
                if (!post) {
                    console.log('No post found');
                    return false;
                }
                const comment = post.comments.find(c => c.id === commentId);
                if (!comment) {
                    console.log('No comment found');
                    return false;
                }
                console.log('COMMENT', comment.comment);
                const newReply = new reply_1.default({
                    reply: reply,
                    author: author,
                });
                console.log(newReply);
                comment.replies.push(newReply);
                const updatedComment = yield post.save();
                if (updatedComment) {
                    console.log('Reply added successfully');
                    return true;
                }
                else {
                    console.log('Failed to add reply');
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
exports.CommentRepositoryImpl = CommentRepositoryImpl;
