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
                console.log('1');
                const userId = req.params.userId;
                console.log('userId', userId);
                const posts = yield this.interactor.getHomePosts(userId);
                if (posts) {
                    console.log('OUTER POSTS', posts);
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
                const author = req.body.author;
                const userId = author;
                const isLikeAdded = yield this.interactor.addLike(postId, userId);
                if (isLikeAdded) {
                    return res.status(200).json({ success: true, message: 'Liked the post Successfully' });
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
                const author = req.body.author;
                const userId = author;
                const isLikeRemoved = yield this.interactor.removeLike(postId, userId);
                if (isLikeRemoved) {
                    return res.status(200).json({ success: true, message: 'Unliked the post Successfully' });
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
                console.log('1', postId);
                const likes = yield this.interactor.getLikes(postId);
                if (likes) {
                    console.log('LIKES', likes);
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
                console.log('111111111111111111');
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
                console.log('111111111111111111');
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
    addPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('1');
            const { caption, cloudinaryUrls, tags, isChecked } = req.body;
            const userId = req.params.userId;
            const images = cloudinaryUrls;
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
}
exports.PostController = PostController;
