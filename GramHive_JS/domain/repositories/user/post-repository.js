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
exports.PostRepositoryImpl = void 0;
const post_1 = __importDefault(require("../../../data/data-sources/mongodb/models/post"));
const save_1 = __importDefault(require("../../../data/data-sources/mongodb/models/save"));
const followers_1 = __importDefault(require("../../../data/data-sources/mongodb/models/followers"));
class PostRepositoryImpl {
    addPost(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('3', postData);
                const isPostAdded = yield post_1.default.create(postData);
                console.log(isPostAdded);
                return isPostAdded ? true : false;
            }
            catch (error) {
                console.error('Error adding post:', error);
                return false;
            }
        });
    }
    addLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_1.default.findById(postId);
                if (!post) {
                    console.error('Post not found');
                    return false;
                }
                const newLike = {
                    user: userId,
                    post: postId,
                };
                post.likes.push(newLike);
                const isLikeAdded = yield post.save();
                if (isLikeAdded) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error adding like:', error);
                return false;
            }
        });
    }
    removeLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_1.default.findById(postId);
                if (!post) {
                    console.error('Post not found');
                    return false;
                }
                const likeIndex = post.likes.findIndex((like) => like.user.toString() === userId);
                if (likeIndex !== 1) {
                    post.likes.splice(likeIndex);
                    const isLikeRemoved = yield post.save();
                    if (isLikeRemoved) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            catch (error) {
                console.error('Error removing like:', error);
                return false;
            }
        });
    }
    getLikes(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('444', postId);
                const post = yield post_1.default.findById(postId);
                if (!post) {
                    console.error('Post not found');
                    return null;
                }
                console.log(post.likes);
                return post.likes;
            }
            catch (error) {
                console.error('Error getting likes:', error);
                return null;
            }
        });
    }
    getHomePosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield followers_1.default.find({ followed_id: userId });
                const userIds = users.map(user => user.follower_id);
                console.log('2222', userIds);
                const posts = yield post_1.default.find({ userId: { $in: userIds } }).populate('userId');
                console.log('POSTS', posts);
                return posts.length > 0 ? posts : null;
            }
            catch (error) {
                console.error('Error retrieving posts:', error);
                return null;
            }
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPostDeleted = yield post_1.default.findByIdAndDelete(postId);
                if (isPostDeleted) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error retrieving posts:', error);
                return false;
            }
        });
    }
    savePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ispostSaved = yield save_1.default.create({ user: userId, post: postId });
                if (ispostSaved) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error retrieving posts:', error);
                return false;
            }
        });
    }
}
exports.PostRepositoryImpl = PostRepositoryImpl;
