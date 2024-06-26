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
            console.log('1234567890------------------------------------------', req.body);
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
    profilePosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('1');
                const userId = req.params.userId;
                console.log('userId', userId);
                const posts = yield this.interactor.profilePosts(userId);
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
    followUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { follower_id, followed_id } = req.body;
                console.log(follower_id, followed_id);
                const success = yield this.interactor.followUser({ follower_id, followed_id });
                if (success) {
                    console.log('aahd mwone true aaytnd');
                    return res.status(200).json({ success: true, message: 'User was followed successfully' });
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
                console.log(follower_id, followed_id);
                const success = yield this.interactor.unfollowuser({ follower_id, followed_id });
                if (success) {
                    console.log('aahd mwone avne unfollow akktnd');
                    return res.status(200).json({ success: true, message: 'User was followed successfully' });
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
}
exports.profileController = profileController;
