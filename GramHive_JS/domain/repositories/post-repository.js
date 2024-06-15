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
const post_1 = __importDefault(require("../../data/data-sources/mongodb/models/post"));
const save_1 = __importDefault(require("../../data/data-sources/mongodb/models/save"));
const followers_1 = __importDefault(require("../../data/data-sources/mongodb/models/followers"));
const report_1 = __importDefault(require("../../data/data-sources/mongodb/models/report"));
class PostRepositoryImpl {
    addPost(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPostAdded = yield post_1.default.create(postData);
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
                    return { success: false, message: 'Post not found' };
                }
                const alreadyLiked = post.likes.some(like => like.user.toString() === userId);
                if (alreadyLiked) {
                    return { success: false, message: 'User has already liked this post' };
                }
                const newLike = {
                    user: userId,
                    post: postId,
                };
                post.likes.push(newLike);
                yield post.save();
                yield post.populate('likes.user');
                return post;
            }
            catch (error) {
                console.error('Error adding like:', error);
                return { success: false, message: 'Error adding like', error };
            }
        });
    }
    removeLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_1.default.findById(postId).populate('userId').populate('likes.user');
                if (!post) {
                    return false;
                }
                const likeIndex = post.likes.findIndex((like) => like.user._id.toString() === userId);
                if (likeIndex === -1) {
                    console.log('False');
                    return false;
                }
                post.likes.splice(likeIndex, 1);
                yield post.save();
                return post;
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
                const post = yield post_1.default.findById(postId).populate('likes.user');
                if (!post) {
                    console.error('Post not found');
                    return null;
                }
                return post.likes;
            }
            catch (error) {
                console.error('Error getting likes:', error);
                return null;
            }
        });
    }
    getHomePosts(userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield followers_1.default.find({ followed_id: userId });
                const userIds = users.map(user => user.follower_id);
                const posts = yield post_1.default.find({
                    $and: [
                        { $or: [{ userId: { $in: userIds } }, { userId: userId }] },
                        { $or: [{ isBan: { $exists: false } }, { isBan: false }] }
                    ]
                })
                    .populate('userId')
                    .populate('likes.user')
                    .populate('tags')
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * 2)
                    .limit(2);
                const savedPosts = yield save_1.default.find({ user: userId }).select('post');
                const savedPostsData = savedPosts.map(savedPost => savedPost.post);
                if (posts && savedPostsData) {
                    const savedPostIds = savedPostsData.map((objectId) => objectId.toString());
                    posts.forEach(post => {
                        post.isSaved = savedPostIds.includes(post._id.toString());
                        if (post.isSaved) {
                            console.log('set');
                        }
                    });
                }
                return posts;
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
    unsavePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ispostUnsaved = yield save_1.default.findOneAndDelete({ user: userId, post: postId });
                if (ispostUnsaved) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error unsaving post:', error);
                return false;
            }
        });
    }
    ReportPost(reportData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPostReported = yield report_1.default.create(reportData);
                if (isPostReported) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error reporting post:', error);
                return false;
            }
        });
    }
    UpdatePost(postId, description, images, taggedPeople) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_1.default.findById(postId);
                console.log('Post :', postId, description, images, taggedPeople);
                const isPostUpdated = yield post_1.default.updateOne({ _id: postId }, { $set: { caption: description, images: images, tags: taggedPeople } });
                if (isPostUpdated) {
                    console.log('Updated post:', isPostUpdated);
                }
                return isPostUpdated ? true : false;
            }
            catch (error) {
                console.error('Error reporting post:', error);
                return false;
            }
        });
    }
    findById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_1.default.findById(postId);
        });
    }
}
exports.PostRepositoryImpl = PostRepositoryImpl;
