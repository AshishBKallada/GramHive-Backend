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
    profilePosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2');
            try {
                const profilePosts = yield this.Repository.getProfilePosts(userId);
                return profilePosts;
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
}
exports.profileInteractorImpl = profileInteractorImpl;
