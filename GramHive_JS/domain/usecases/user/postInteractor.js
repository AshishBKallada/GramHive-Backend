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
exports.postInteractorImpl = void 0;
class postInteractorImpl {
    constructor(Repository) {
        this.Repository = Repository;
    }
    getHomePosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2');
            try {
                const HomePosts = yield this.Repository.getHomePosts(userId);
                return HomePosts;
            }
            catch (error) {
                console.error('Error fetching profile posts:', error);
                return null;
            }
        });
    }
    addPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2', data);
            try {
                const isPostAdded = yield this.Repository.addPost(data);
                return isPostAdded;
            }
            catch (error) {
                console.error('Error adding post:', error);
                return false;
            }
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPostDelete = yield this.Repository.deletePost(postId);
                if (isPostDelete)
                    return true;
                else
                    return false;
            }
            catch (error) {
                console.error('Error fetching profile posts:', error);
                return false;
            }
        });
    }
    savePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isSavePost = yield this.Repository.savePost(postId, userId);
                if (isSavePost) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error saving post:', error);
                return false;
            }
        });
    }
    addLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isLikeAdded = yield this.Repository.addLike(postId, userId);
                return isLikeAdded;
            }
            catch (error) {
                console.error('Error getting comments:', error);
                return false;
            }
        });
    }
    removeLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isLikeRemoved = yield this.Repository.removeLike(postId, userId);
                return isLikeRemoved;
            }
            catch (error) {
                console.error('Error getting comments:', error);
                return false;
            }
        });
    }
    getLikes(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likes = yield this.Repository.getLikes(postId);
                return likes;
            }
            catch (error) {
                console.error('Error getting likes:', error);
                return null;
            }
        });
    }
}
exports.postInteractorImpl = postInteractorImpl;
