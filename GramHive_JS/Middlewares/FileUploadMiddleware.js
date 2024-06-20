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
exports.FileUploadMiddleware = void 0;
const s3Config_1 = require("../config/s3Config");
const FileUploadMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    try {
        const uploadedFiles = yield Promise.all(files.map((file, index) => __awaiter(void 0, void 0, void 0, function* () {
            const params = {
                Bucket: 'xoro-blah-blah-bucket-api-south-1',
                Key: `${Date.now()}-${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const s3Response = yield s3Config_1.s3.upload(params).promise();
            return {
                url: s3Response.Location,
                fileType: file.mimetype,
            };
        })));
        req.uploadedFiles = uploadedFiles;
        next();
    }
    catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Error uploading files' });
    }
});
exports.FileUploadMiddleware = FileUploadMiddleware;
