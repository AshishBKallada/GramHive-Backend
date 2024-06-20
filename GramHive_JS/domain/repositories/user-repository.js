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
exports.UserRepositoryImpl = void 0;
const user_1 = __importDefault(require("../../data/data-sources/mongodb/models/user"));
const otp_1 = __importDefault(require("../../data/data-sources/mongodb/models/otp"));
const followers_1 = __importDefault(require("../../data/data-sources/mongodb/models/followers"));
const accessToken_generator_1 = require("../../functions/accessToken-generator");
const jwt = require('jsonwebtoken');
class UserRepositoryImpl {
    findByGoogleId(googleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findOne({ googleId });
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_1.default(userData);
            yield user.save();
            return user;
        });
    }
    findByCredentials(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(username, password);
            const user = yield user_1.default.findOne({
                $or: [
                    { email: username },
                    { username: username }
                ]
            });
            console.log('user', user);
            let message = '';
            let token = null;
            if (!user) {
                message = 'Invalid User';
            }
            else {
                if (password !== user.password) {
                    console.log('Invalid password');
                    message = 'Invalid password';
                }
                else {
                    token = yield (0, accessToken_generator_1.generateAccessToken)(user);
                    console.log('Token', token);
                }
            }
            if (user && !message) {
                return { user: user.toObject(), message, token };
            }
            else {
                console.log('message', message);
                return { user: null, message, token };
            }
        });
    }
    updateOTP(emailId, newOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUpdateOTP = yield otp_1.default.findOneAndUpdate({ email: emailId }, { $set: { otp: newOtp } });
                return isUpdateOTP != null;
            }
            catch (error) {
                console.log(error);
                throw new Error();
            }
        });
    }
    updateLocation(userId, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isLocationUpdated = yield user_1.default.findByIdAndUpdate(userId, { $set: { 'location.latitude': latitude, 'location.longitude': longitude } }, { new: true });
                return !!isLocationUpdated;
            }
            catch (error) {
                console.log(error);
                throw new Error();
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Repository');
            console.log(user);
            const { name, email, username, password, image = 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' } = user;
            const newUser = new user_1.default({ name, email, username, password, image });
            yield newUser.save();
            let token = yield (0, accessToken_generator_1.generateAccessToken)(user);
            console.log('Token', token);
            return { user: newUser ? newUser.toObject() : null, token };
        });
    }
    userExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('3', email);
            const userExists = yield user_1.default.findOne({ email: email });
            return !!userExists;
        });
    }
    saveToDB(signupData, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, username, password } = signupData;
                const isAddedToDB = yield otp_1.default.create({ name: name, email: email, username: username, password: password, otp: otp });
                return isAddedToDB ? true : false;
            }
            catch (error) {
                console.error("Error saving data to database:", error);
                return false;
            }
        });
    }
    verifyOtp(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('3');
                const user = yield otp_1.default.findOne({ otp: otp });
                console.log('user', user);
                return user ? user : null;
            }
            catch (error) {
                console.error('Error verifying OTP from database:', error);
                return null;
            }
        });
    }
    getFilteredUsers(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield user_1.default.find({ $or: [{ username: { $regex: new RegExp(filter, 'i') } }, { name: { $regex: new RegExp(filter, 'i') } }] });
                const users = userData.map(({ _id, username, name, image }) => ({ _id, username, name, image }));
                return users ? users : null;
            }
            catch (error) {
                console.error('Error retrieving posts:', error);
                return null;
            }
        });
    }
    getSearchuser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(userId).select('-password');
                const followersData = yield followers_1.default.find({ follower_id: userId });
                const followingData = yield followers_1.default.find({ followed_id: userId });
                console.log('user', user);
                console.log('followers:', followersData);
                console.log('following:', followingData);
                const followers_ids = followersData.map((follower) => follower.followed_id);
                console.log('followers_ids:', followers_ids);
                const following_ids = followingData.map((followed) => followed.follower_id);
                console.log('following_ids:', following_ids);
                const followers = yield user_1.default.find({ _id: { $in: followers_ids } });
                const following = yield user_1.default.find({ _id: { $in: following_ids } });
                if (user) {
                    return { user, followers, following };
                }
                else {
                    return { user: null, followers: [], following: [] };
                }
            }
            catch (error) {
                console.error('Error retrieving searched user data:', error);
                return { user: null, followers: [], following: [] };
            }
        });
    }
    getLocations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followingUsers = yield followers_1.default.find({ followed_id: userId });
                const followeduserIds = followingUsers.map(follow => follow.follower_id);
                console.log('Following users:', followeduserIds);
                const users = yield user_1.default.find({ _id: { $in: followeduserIds } });
                console.log('users0000000000000000000000: ', users);
                return users;
            }
            catch (error) {
                console.error('Error retrieving searched user data:', error);
                return null;
            }
        });
    }
    getSuggestedUsers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const followedUsers = yield followers_1.default.find({ followed_id: userId });
                const followedIds = yield followedUsers.map((user) => user.followed_id);
                if (!followedIds.length)
                    return null;
                const suggestedFollowerIds = yield followers_1.default.aggregate([
                    { $match: { followed_id: { $in: followedIds.map(f => f._id) } } },
                    { $match: { follower_id: { $ne: userId } } },
                    { $group: { _id: null, suggestedFollowerIds: { $addToSet: '$follower_id' } } },
                    { $project: { suggestedFollowerIds: 1 } },
                ]);
                const suggestedIds = ((_a = suggestedFollowerIds[0]) === null || _a === void 0 ? void 0 : _a.suggestedFollowerIds) || [];
                const projection = { username: 1, name: 1, image: 1 };
                const mutualUsers = yield user_1.default.find({ _id: { $in: suggestedIds } }, projection);
                return mutualUsers;
            }
            catch (error) {
                console.error('Error fetching note:', error);
                throw error;
            }
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ email: email });
                return !!user;
            }
            catch (error) {
                console.error('Error checking if user exists :', error);
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findById(id);
            return user ? user : null;
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
