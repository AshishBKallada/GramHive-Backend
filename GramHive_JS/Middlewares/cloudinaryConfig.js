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
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dlbq8zlgn',
    api_key: '116937341467834',
    api_secret: 'kDjPDhGc2j3i5A5ynJ8C7pT2Kfw'
});
const uploadToCloudinary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cloudinaryUrls = [];
        if (req.file) {
            const file = req.file;
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: 'auto',
                folder: 'GramHive-Project',
            }, (err, result) => {
                if (err) {
                    console.error('Cloudinary upload error:', err);
                    return next(err);
                }
                if (result) {
                    console.log('qqqqqqqqqqqq');
                    console.log(result);
                    cloudinaryUrls.push(result.secure_url);
                }
                req.body.cloudinaryUrl = cloudinaryUrls;
                next();
            });
            uploadStream.end(file.buffer);
        }
        else if (req.files) {
            const files = req.files;
            for (const file of files) {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    resource_type: 'auto',
                    folder: 'GramHive-Project',
                }, (err, result) => {
                    if (err) {
                        console.error('Cloudinary upload error:', err);
                        return next(err);
                    }
                    if (result) {
                        cloudinaryUrls.push(result.secure_url);
                    }
                    if (cloudinaryUrls.length === files.length) {
                        req.body.cloudinaryUrls = cloudinaryUrls;
                        next();
                    }
                });
                uploadStream.end(file.buffer);
            }
        }
        else {
            next(new Error('No files provided'));
        }
    }
    catch (error) {
        console.error('Error in uploadToCloudinary middleware:', error);
        next(error);
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
exports.default = exports.uploadToCloudinary;
