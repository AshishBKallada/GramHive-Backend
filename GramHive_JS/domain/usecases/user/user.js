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
exports.UserServiceImpl = void 0;
class UserServiceImpl {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('UserService: login');
                console.log('Username:', credentials.username);
                console.log('Password:', credentials.password);
                const { user, message, token } = yield this.userRepository.findByCredentials(credentials.username, credentials.password);
                console.log('Usecase', user, token, message);
                return { user, message, token };
            }
            catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        });
    }
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('UserService: signup');
                console.log('New user data:', userData);
                const newUser = {
                    username: userData.username,
                    name: userData.name,
                    password: userData.password,
                    email: userData.email,
                    image: userData.image
                };
                console.log(newUser);
                const { user, token } = yield this.userRepository.save(newUser);
                console.log('Usecase returned', user, token);
                return { user, token };
            }
            catch (error) {
                console.error('Error during signup:', error);
                throw error;
            }
        });
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
                const updatedUser = yield this.userRepository.updateProfile(newData);
                return updatedUser ? updatedUser : null;
            }
            catch (error) {
                console.error('Error updating user profile:', error);
                return null;
            }
        });
    }
    addPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2', data);
            try {
                const isPostAdded = yield this.userRepository.addPost(data);
                return isPostAdded;
            }
            catch (error) {
                console.error('Error adding post:', error);
                return false;
            }
        });
    }
    sendMail(signupData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2', signupData);
            const email = signupData.email;
            const userExists = yield this.userRepository.userExists(email);
            if (userExists) {
                return { userExists: true, isMailSent: false };
            }
            try {
                const { otp, success } = yield this.userRepository.sendMail(email);
                if (success) {
                    const saveToDB = yield this.userRepository.saveToDB(signupData, otp);
                    return { userExists: false, isMailSent: true };
                }
                else {
                    return { userExists: false, isMailSent: false };
                }
            }
            catch (error) {
                console.error('Error sending email:', error);
                return { userExists: false, isMailSent: false };
            }
        });
    }
    verifyotp(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('2');
                const isUser = yield this.userRepository.verifyOtp(otp);
                if (isUser) {
                    console.log('4', isUser);
                    const { user, token } = yield this.userRepository.save(isUser);
                    if (user) {
                        return { success: true, token };
                    }
                }
                return { success: false };
            }
            catch (error) {
                console.error('Error verifying OTP:', error);
                return false;
            }
        });
    }
    profilePosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2');
            try {
                const profilePosts = yield this.userRepository.getProfilePosts(userId);
                return profilePosts;
            }
            catch (error) {
                console.error('Error fetching profile posts:', error);
                return null;
            }
        });
    }
    getSearchData(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('2');
                const users = yield this.userRepository.getFilteredUsers(filter);
                if (users) {
                    console.log(users);
                    return users;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error('Error fetching filtered users:', error);
                return null;
            }
        });
    }
    getSearchUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, followers, following } = yield this.userRepository.getSearchuser(userId);
                if (user) {
                    console.log('User data fetched:', user);
                    return { user, followers, following };
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error('Error fetching searched user data:', error);
                return null;
            }
        });
    }
    followUser(userRelationship) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.userRepository.followUser(userRelationship);
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
    unfollowuser(userRelationship) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.userRepository.unfollowUser(userRelationship);
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
    addComment(postId, comment, author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isCommentAdded = yield this.userRepository.addComment(postId, comment, author);
                if (isCommentAdded) {
                    return true;
                }
                else {
                    false;
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    getComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.userRepository.getComments(postId);
                return comments;
            }
            catch (error) {
                console.error('Error getting comments:', error);
                return null;
            }
        });
    }
    addLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isLikeAdded = yield this.userRepository.addLike(postId, userId);
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
                const isLikeRemoved = yield this.userRepository.removeLike(postId, userId);
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
                const likes = yield this.userRepository.getLikes(postId);
                return likes;
            }
            catch (error) {
                console.error('Error getting likes:', error);
                return null;
            }
        });
    }
    addCommentReply(postId, commentId, reply, author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isCommentReplyAdded = yield this.userRepository.addCommentReply(postId, commentId, reply, author);
                if (isCommentReplyAdded) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                console.error('Error getting likes:', error);
                return false;
            }
        });
    }
    getHomePosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('2');
            try {
                const HomePosts = yield this.userRepository.getHomePosts(userId);
                return HomePosts;
            }
            catch (error) {
                console.error('Error fetching profile posts:', error);
                return null;
            }
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPostDelete = yield this.userRepository.deletePost(postId);
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
                const isSavePost = yield this.userRepository.savePost(postId, userId);
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
}
exports.UserServiceImpl = UserServiceImpl;
