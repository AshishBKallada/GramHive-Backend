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
exports.storyInteractorImpl = void 0;
class storyInteractorImpl {
    constructor(Repository, uploader) {
        this.Repository = Repository;
        this.uploader = uploader;
    }
    uploadStory(userId, storyFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileBuffer = storyFile.buffer;
                const filePath = `users/${userId}/uploads/${Date.now()}_${Math.floor(Math.random() * 1000)}`;
                let contentType = '';
                if (storyFile.mimetype.startsWith('image')) {
                    contentType = 'image/jpeg';
                }
                else if (storyFile.mimetype.startsWith('video')) {
                    contentType = 'video/mp4';
                }
                const imageUrl = yield this.uploader.uploadStory(filePath, fileBuffer, contentType);
                console.log('SUCCESSFULLY UPLOADED TO Firebase', imageUrl);
                if (!imageUrl) {
                    return false;
                }
                const uploadStoryToDB = yield this.Repository.addStory(userId, imageUrl);
                return uploadStoryToDB ? true : false;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    getStories(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stories = yield this.Repository.getStories(userId);
                return stories;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
exports.storyInteractorImpl = storyInteractorImpl;
