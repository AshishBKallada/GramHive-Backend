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
exports.profileController = void 0;
class profileController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, username, name, website, bio, cloudinaryUrl, gender } = req.body;
            const image = cloudinaryUrl[0];
            try {
                const updatedUser = yield this.interactor.updateProfile({ userId, username, name, website, bio, image, gender });
                if (updatedUser) {
                    res.status(200).json({ message: 'Profile update successful', updatedUser });
                }
                else {
                    res.status(401).json({ message: 'Failed to update profile' });
                }
            }
            catch (e) {
                console.error('Error during profile updation:', e);
                res.status(500).send('Internal server error');
            }
        });
    }
    onGetProfileData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const { posts, followers, following } = yield this.interactor.getProfileData(userId);
                if (posts && followers && following) {
                    res.status(200).json({ success: true, message: 'Retreived profileData  successfully.', posts, followers, following });
                }
                else {
                    res.status(400).json({ success: false, message: 'Failed to retreive profileData .' });
                }
            }
            catch (error) {
                console.error('Error retreiving posts', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    followUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { follower_id, followed_id } = req.body;
                const notification = yield this.interactor.followUser({ follower_id, followed_id });
                if (notification) {
                    return res.status(200).json({ success: true, message: 'User was followed successfully', notification });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to follow the user' });
                }
            }
            catch (error) {
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    unfollowUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { follower_id, followed_id } = req.body;
                const success = yield this.interactor.unfollowUser({ follower_id, followed_id });
                if (success) {
                    console.log('aahd mwone avne unfollow akktnd');
                    return res.status(200).json({ success: true, message: 'User was unfollowed successfully' });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to unfollow the user' });
                }
            }
            catch (error) {
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    onGetFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const followers = yield this.interactor.getFollowers(userId);
                if (followers) {
                    console.log('Followers:', followers);
                    return res.status(200).json({ success: true, message: 'Retreieved followers successfully', followers: followers });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to retreive followers' });
                }
            }
            catch (error) {
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    onGetFollowing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const following = yield this.interactor.getFollowing(userId);
                if (following) {
                    return res.status(200).json({ success: true, message: 'Retreieved following successfully', following: following });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to retreive following' });
                }
            }
            catch (error) {
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    onRemoveFollower(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { follower_id, followed_id } = req.body;
                const isFollowerRemoved = yield this.interactor.RemoveFollower({ follower_id, followed_id });
                if (isFollowerRemoved) {
                    return res.status(200).json({ success: true, message: 'Removed user successfully', });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to remove user' });
                }
            }
            catch (error) {
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
    onGetSaved(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const posts = yield this.interactor.getSaved(userId);
                if (posts) {
                    return res.status(200).json({ success: true, message: 'retreived saved posts successfully', posts });
                }
                else {
                    return res.status(404).json({ success: false, message: 'Failed to retreive saved posts' });
                }
            }
            catch (error) {
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        });
    }
}
exports.profileController = profileController;
