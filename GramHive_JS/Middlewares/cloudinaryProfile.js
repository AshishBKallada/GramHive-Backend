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
exports.uploadToProfileCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dlbq8zlgn',
    api_key: '116937341467834',
    api_secret: 'kDjPDhGc2j3i5A5ynJ8C7pT2Kfw'
});
const uploadToProfileCloudinary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Uploading image to Cloudinary...', req.file);
        const result = yield cloudinary_1.v2.uploader.upload(req.file.buffer.toString('base64'), {
            folder: 'profile_images',
        });
        console.log('Image uploaded successfully to Cloudinary');
        console.log('Cloudinary response:', result);
        req.imageUrl = result.secure_url;
        next();
    }
    catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }
});
exports.uploadToProfileCloudinary = uploadToProfileCloudinary;
exports.default = exports.uploadToProfileCloudinary;
