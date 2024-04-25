"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileRouter = (0, express_1.Router)();
const authMiddleware_1 = __importDefault(require("../../../Middlewares/authMiddleware"));
const multerProfile_1 = __importDefault(require("../../../Middlewares/multerProfile"));
const cloudinaryConfig_1 = __importDefault(require("../../../Middlewares/cloudinaryConfig"));
profileRouter.post('/updateprofile', authMiddleware_1.default, multerProfile_1.default, cloudinaryConfig_1.default, Middlware.updateProfile);
profileRouter.get('/profile/:userId', authMiddleware_1.default, Middleware.profile);
profileRouter.post('/followuser', Middleware.followUser);
profileRouter.post('/unfollowuser', Middleware.followUser);
