"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = __importDefault(require("../../../Middlewares/authMiddleware"));
const cloudinaryConfig_1 = __importDefault(require("../../../Middlewares/cloudinaryConfig"));
const multerConfig_1 = __importDefault(require("../../../Middlewares/multerConfig"));
const express_1 = require("express");
const postRouter = (0, express_1.Router)();
postRouter.post('/addpost/:userId', authMiddleware_1.default, multerConfig_1.default, cloudinaryConfig_1.default, Middleware.addPost);
postRouter.post('/posts/:postId/like', Middleware.addLike);
postRouter.delete('/posts/:postId/unlike', middleware.removeLike);
postRouter.get('/posts/:postId/likes', Middleware.getLikes);
postRouter.get('/home/:userId', Middleware.getHomePosts);
postRouter.delete('/posts/:postId/delete', Middleware.deletePost);
postRouter.post('/posts/:postId/save/:author', Middleware.savePost);
