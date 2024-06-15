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
exports.profileRepositoryImpl = void 0;
const user_1 = __importDefault(require("../../data/data-sources/mongodb/models/user"));
const post_1 = __importDefault(require("../../data/data-sources/mongodb/models/post"));
const followers_1 = __importDefault(require("../../data/data-sources/mongodb/models/followers"));
const save_1 = __importDefault(require("../../data/data-sources/mongodb/models/save"));
class profileRepositoryImpl {
    updateProfile(newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = newData.userId;
                const updatedFields = {};
                if (newData.username)
                    updatedFields.username = newData.username;
                if (newData.name)
                    updatedFields.name = newData.name;
                if (newData.image)
                    updatedFields.image = newData.image;
                if (newData.gender)
                    updatedFields.gender = newData.gender;
                if (newData.bio)
                    updatedFields.bio = newData.bio;
                if (newData.website)
                    updatedFields.website = newData.website;
                const updatedUser = yield user_1.default.findByIdAndUpdate(userId, updatedFields, { new: true });
                if (updatedUser) {
                    console.log('PROFILE UPDATED');
                    return updatedUser;
                }
                else {
                    console.log('PROFILE NOT UPDATED');
                    return null;
                }
            }
            catch (error) {
                console.error('Error updating user profile:', error);
                return null;
            }
        });
    }
    getProfilePosts(userId, savedPostsData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_1.default.find({ userId: userId }).populate('tags');
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
    followUser(userRelationship) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adduserRelationship = yield followers_1.default.create(userRelationship);
                const authorId = adduserRelationship.followed_id;
                const author = yield user_1.default.findById(authorId);
                console.log(author);
                if (author) {
                    return author.username;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error', error);
                return false;
            }
        });
    }
    unfollowUser(userRelationship) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteuserRelationship = yield followers_1.default.findOneAndDelete(userRelationship);
                if (deleteuserRelationship) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error', error);
                return false;
            }
        });
    }
    getFollowers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followerData = yield followers_1.default.find({ follower_id: userId });
                const follower_ids = followerData.map((follower) => follower.followed_id);
                const followers = yield user_1.default.find({ _id: { $in: follower_ids } });
                if (followers) {
                    return followers;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getFollowing(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followingData = yield followers_1.default.find({ followed_id: userId });
                const following_ids = followingData.map((follower) => follower.follower_id);
                const following = yield user_1.default.find({ _id: { $in: following_ids } });
                if (following) {
                    return following;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    removeFollower(userRelationship) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isFollowerRemoved = yield followers_1.default.findOneAndDelete(userRelationship);
                return isFollowerRemoved ? true : false;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    getSavedPostIds(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield save_1.default.find({ user: userId });
                const postIds = posts.map(post => post.post);
                return postIds;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    fetchSavedPosts(postIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedPosts = yield post_1.default.find({ _id: { $in: postIds } })
                    .populate('userId', '+name +username +image')
                    .populate({ path: 'userId', select: '-password -gender -email -website -isBan -bio' });
                return savedPosts ? savedPosts : null;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    getSavedPostsData(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedPosts = yield save_1.default.find({ user: userId }).select('post');
                const savedPostIds = savedPosts.map(savedPost => savedPost.post);
                return savedPostIds;
            }
            catch (error) {
                console.error('Error retreiving saved posts:', error);
                return null;
            }
        });
    }
}
exports.profileRepositoryImpl = profileRepositoryImpl;
