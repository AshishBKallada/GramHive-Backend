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
const addComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const { comment, author } = req.body;
        console.log(comment, '4');
        const isCommentAdded = yield userService.addComment(postId, comment, author);
        if (isCommentAdded) {
            return res.status(200).json({ success: true, message: 'User was followed successfully' });
        }
        else {
            return res.status(404).json({ success: false, message: 'Failed to follow the user' });
        }
    }
    catch (error) {
        return res.status(404).json({ success: false, message: 'internal server error' });
    }
});
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        console.log('1', postId);
        const comments = yield userService.getComments(postId);
        if (comments) {
            console.log('COMMENTS', comments);
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
const addCommentReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, commentId } = req.params;
        const { reply, author } = req.body;
        console.log(postId, author, reply, commentId, '4');
        const isCommentReplyAdded = yield userService.addCommentReply(postId, commentId, reply, author);
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
const module, exports = { addComments, getComments, addCommentReply };
