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
exports.storyController = void 0;
class storyController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    addStory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const storyFile = req.file;
            if (!storyFile) {
                return res.status(400).json({ success: false, error: 'No file uploaded' });
            }
            try {
                const isStoryUploaded = yield this.interactor.uploadStory(userId, storyFile);
                if (isStoryUploaded) {
                    console.log('Story uploaded successfully');
                    return res.status(200).json({ success: true });
                }
                else {
                    res.status(404).json({ success: false, error: 'Failed to upload story' });
                }
            }
            catch (error) {
                console.error('Error uploading file:', error);
                return res.status(500).json({ success: false, error: 'Internal server error' });
            }
        });
    }
    onGetStories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const stories = yield this.interactor.getStories(userId);
                return res.status(200).json({ success: true, message: 'retreived stories successfully', stories });
            }
            catch (error) {
                console.error('Error retreiving stories:', error);
                return res.status(500).json({ success: false, error: 'Internal server error' });
            }
        });
    }
}
exports.storyController = storyController;
