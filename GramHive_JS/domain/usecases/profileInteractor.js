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
exports.profileInteractorImpl = void 0;
class profileInteractorImpl {
    constructor(Repository) {
        this.Repository = Repository;
    }
    updateProfile(Data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newData = {
                    userId: Data.userId,
                    username: Data.username,
                    name: Data.name,
                    image: Data.image,
                    website: Data.website,
                    bio: Data.bio,
                    gender: Data.gender
                };
                console.log('NewDataXXXXXXXXXXXX', newData);
                const updatedUser = yield this.Repository.updateProfile(newData);
                return updatedUser ? updatedUser : null;
            }
            catch (error) {
                console.error('Error updating user profile:', error);
                return null;
            }
        });
    }
    getProfileData(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.Repository.getProfilePosts(userId);
                const followers = yield this.Repository.getFollowers(userId);
                const following = yield this.Repository.getFollowing(userId);
                return { posts, followers, following };
            }
            catch (error) {
                console.error('Error fetching profile posts:', error);
                return null;
            }
        });
    }
    followUser(userRelationship) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.Repository.followUser(userRelationship);
                if (success) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    unfollowUser(userRelationship) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('UNFOLLOW USER 2');
                const success = yield this.Repository.unfollowUser(userRelationship);
                if (success) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    getFollowers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followers = yield this.Repository.getFollowers(userId);
                return followers;
            }
            catch (errror) {
                throw new Error("Failed to get followers.");
            }
        });
    }
    getFollowing(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const following = yield this.Repository.getFollowing(userId);
                return following;
            }
            catch (errror) {
                throw new Error("Failed to get following.");
            }
        });
    }
}
exports.profileInteractorImpl = profileInteractorImpl;
