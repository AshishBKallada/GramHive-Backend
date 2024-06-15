"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioUploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const s3Config_1 = require("../config/s3Config");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const audioUploadMiddleware = (req, res, next) => {
    upload.single('wavfile')(req, res, (err) => {
        if (err) {
            console.error('File upload failed:', err);
            return res.status(500).json({ message: 'File upload failed', error: err.message });
        }
        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const file = req.file;
        console.log('Uploaded file:', file);
        const params = {
            Bucket: 'xoro-blah-blah-bucket-api-south-1',
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        s3Config_1.s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file to S3:', err);
                return res.status(500).json({ message: 'Error uploading file to S3', error: err.message });
            }
            console.log('File uploaded successfully. S3 location:', data.Location);
            req.audio = data.Location;
            next();
        });
    });
};
exports.audioUploadMiddleware = audioUploadMiddleware;
