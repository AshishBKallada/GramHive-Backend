"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatFileUpload = void 0;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
exports.chatFileUpload = upload.array('files');
