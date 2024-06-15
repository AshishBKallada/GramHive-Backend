"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: 'AKIA4MTWJ24JWFG3CSXB',
    secretAccessKey: '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',
    region: 'ap-south-1',
});
