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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToFirebase = void 0;
const admin = require('firebase-admin');
const firebase_service_key_json_1 = __importDefault(require("../firebaseKey/firebase-service-key.json"));
admin.initializeApp({
    credential: admin.credential.cert(firebase_service_key_json_1.default),
    storageBucket: 'gramhive.appspot.com'
});
function uploadFileToFirebase(filePath, fileBuffer, contentType) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucket = admin.storage().bucket();
        try {
            yield bucket.file(filePath).save(fileBuffer, {
                metadata: { contentType }
            });
            console.log('File uploaded successfully');
            return `https://storage.googleapis.com/${bucket.name}/${filePath}`;
        }
        catch (error) {
            console.error('Error uploading file to Firebase Storage:', error);
            throw error;
        }
    });
}
exports.uploadFileToFirebase = uploadFileToFirebase;
