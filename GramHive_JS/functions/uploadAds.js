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
exports.uploadFilesToFirebase = void 0;
const uploadStory_1 = require("./uploadStory");
function uploadFilesToFirebase(files) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageUrls = [];
        for (const file of files) {
            const filePath = `your-directory/${file.originalname}`;
            const contentType = file.mimetype;
            try {
                const imageUrl = yield (0, uploadStory_1.uploadFileToFirebase)(filePath, file.buffer, contentType);
                imageUrls.push(imageUrl);
            }
            catch (error) {
                console.error('Error uploading file to Firebase:', error);
            }
        }
        return imageUrls;
    });
}
exports.uploadFilesToFirebase = uploadFilesToFirebase;
