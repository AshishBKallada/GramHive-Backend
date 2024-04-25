"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logReceivedFiles = (req, res, next) => {
    console.log('Received files:', req.files);
    next();
};
exports.default = logReceivedFiles;
