"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dlbq8zlgn',
    api_key: '116937341467834',
    api_secret: 'kDjPDhGc2j3i5A5ynJ8C7pT2Kfw'
});
const uploadImage = () => {
    cloudinary_1.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg", { public_id: "olympic_flag" }, (error, result) => {
        if (error) {
            console.error("Error uploading image:", error);
        }
        else {
            console.log("Image uploaded successfully:", result);
            console.log("Image URL:", result.secure_url);
        }
    });
};
exports.default = uploadImage;
