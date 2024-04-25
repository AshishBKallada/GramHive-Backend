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
const user_1 = __importDefault(require("../../../data/data-sources/mongodb/models/user"));
const post_1 = __importDefault(require("../../../data/data-sources/mongodb/models/post"));
const followers_1 = __importDefault(require("../../../data/data-sources/mongodb/models/followers"));
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
    getProfilePosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('getPROfilePOSTS');
                const posts = yield post_1.default.find({ userId: userId });
                return posts.length > 0 ? posts : null;
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
                console.log(userRelationship);
                const adduserRelationship = yield followers_1.default.create(userRelationship);
                if (adduserRelationship) {
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
    unfollowUser(userRelationship) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(userRelationship);
                const deleteuserRelationship = yield followers_1.default.findOneAndDelete(userRelationship);
                if (deleteuserRelationship) {
                    console.log('1');
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
}
exports.profileRepositoryImpl = profileRepositoryImpl;
