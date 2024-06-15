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
exports.adUploadMiddleware = void 0;
const uploadStory_1 = require("../functions/uploadStory");
function adUploadMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'No files uploaded' });
            }
            const imageUrls = [];
            for (const file of req.files) {
                const imageUrl = yield (0, uploadStory_1.uploadFileToFirebase)(`ads/${file.originalname}`, file.buffer, file.mimetype);
                imageUrls.push(imageUrl);
            }
            req.imageUrls = imageUrls;
            next();
        }
        catch (error) {
            console.error('Error uploading files:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.adUploadMiddleware = adUploadMiddleware;
