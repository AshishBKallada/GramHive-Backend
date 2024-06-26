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
exports.PostController = void 0;
class PostController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    getHomePosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 10;
                const userId = req.params.userId;
                const posts = yield this.interactor.getHomePosts(userId, page, pageSize);
                if (posts) {
                    res.status(200).json({ success: true, message: 'Retreived posts  successfully.', posts });
                }
                else {
                    res.status(400).json({ success: false, message: 'Failed to retreive posts .' });
                }
            }
            catch (error) {
                console.error('Error retreiving posts', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    addLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const userId = req.body.userId;
                const { post, notification } = yield this.interactor.addLike(postId, userId);
                if (post) {
                    const likes = post.likes;
                    console.log('CONTROLLER,', notification);
                    return res.status(200).json({ success: true, likes, notification });
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
    removeLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const userId = req.body.userId;
                const post = yield this.interactor.removeLike(postId, userId);
                if (post) {
                    return res.status(200).json({ success: true, post });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to unlike the post' });
                }
            }
            catch (error) {
                console.error('Internal server error:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    getLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const likes = yield this.interactor.getLikes(postId);
                if (likes) {
                    return res.status(200).json({ success: true, likes });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to get likes' });
                }
            }
            catch (error) {
                console.error('Internal server error:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const isPostDelete = yield this.interactor.deletePost(postId);
                if (isPostDelete) {
                    return res.status(200).json({ success: true, message: 'Deleted the post Successfully' });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to delete the post' });
                }
            }
            catch (error) {
                console.error('Internal server error:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    savePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const userId = req.params.author;
                const isSavePost = yield this.interactor.savePost(postId, userId);
                if (isSavePost) {
                    return res.status(200).json({ success: true, message: 'Saved the post Successfully' });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to save the post' });
                }
            }
            catch (error) {
                console.error('Internal server error:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    onUnsavePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const userId = req.params.author;
                const isUnSavePost = yield this.interactor.unsavePost(postId, userId);
                if (isUnSavePost) {
                    return res.status(200).json({ success: true, message: 'Saved the post Successfully' });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to save the post' });
                }
            }
            catch (error) {
                console.error('Internal server error:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    addPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { caption, urls, tags, isChecked } = req.body;
            const userId = req.user._id;
            const images = urls;
            try {
                const isPostAdded = yield this.interactor.addPost({ caption, images, tags, isChecked, userId });
                if (isPostAdded) {
                    res.status(200).json({ message: 'Images uploaded successfully', success: true });
                }
                else {
                    res.status(404).json({ message: 'Failed to upload image', success: false });
                }
            }
            catch (error) {
                console.error('Error uploading images:', error);
                res.status(500).json({ message: 'An error occurred while uploading images', success: false });
            }
        });
    }
    onReportPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postId;
            const { author, userId } = req.body;
            try {
                const isPostReported = yield this.interactor.reportPost(postId, author, userId);
                if (isPostReported) {
                    return res.status(200).json({ message: 'Post was successfulyy reported', success: true });
                }
                else {
                    return res.status(404).json({ message: 'Failed to report post', success: false });
                }
            }
            catch (error) {
                console.error('Error reporting post:', error);
                res.status(500).json({ message: 'An error occurred while reporting post', success: false });
            }
        });
    }
    onPostUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const { description, images, taggedPeople } = req.body;
                console.log('Controller', description);
                const ispostUpdated = yield this.interactor.updatePost(postId, description, images, taggedPeople);
                if (ispostUpdated) {
                    console.log('POST UPDATED');
                    return res.status(200).json({ message: 'Post updated successfully', success: true });
                }
                else {
                    return res.status(404).json({ message: 'Failed to update post', success: false });
                }
            }
            catch (error) {
                res.status(404).json({ message: 'An error occurred while reporting post', success: false });
            }
        });
    }
    onSharePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const senderId = req.user._id;
                const postId = req.params.postId;
                const users = req.body.users;
                console.log('Controller', senderId, postId, users);
                const success = yield this.interactor.sharePost(senderId, postId, users);
                if (success) {
                    res.status(200).json({ message: "Post shared successfully", success });
                }
                else {
                    res.status(500).json({ message: "Failed to share post", success });
                }
            }
            catch (error) {
                res.status(500).json({ message: "An error occurred", error: error.message });
            }
        });
    }
    onAllPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const posts = yield this.interactor.getAllPosts(userId);
                res.status(200).json(posts);
            }
            catch (error) {
                res.status(500).json({ message: "An error occurred", error: error.message });
            }
        });
    }
}
exports.PostController = PostController;
