"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = __importDefault(require("../../Middlewares/multerConfig"));
const cloudinaryConfig_1 = require("../../Middlewares/cloudinaryConfig");
const authMiddleware_1 = __importDefault(require("../../Middlewares/authMiddleware"));
const multerProfile_1 = __importDefault(require("../../Middlewares/multerProfile"));
function UserRouter(userService) {
    const userRouter = express_1.default.Router();
    userRouter.post('/login', Middleware.login);
    userRouter.post('/signup', Middleware.signup);
    userRouter.post('/updateprofile', authMiddleware_1.default, multerProfile_1.default, cloudinaryConfig_1.uploadToCloudinary, Middlware.updateProfile);
    userRouter.post('/addpost/:userId', authMiddleware_1.default, multerConfig_1.default, cloudinaryConfig_1.uploadToCloudinary, Middleware.addPost);
    userRouter.post('/sendmail', Middleware.sendMail);
    userRouter.post('/verifyotp', Middleware.verifyOTP);
    userRouter.get('/profile/:userId', authMiddleware_1.default, Middleware.profile);
    userRouter.get('/searchuser/:query', Middleware.searchUser);
    userRouter.get('/getsearchuser/:userId', Middleware.getSearchUser);
    userRouter.post('/followuser', Middleware.followUser);
    userRouter.post('/unfollowuser');
    userRouter.post('/posts/:postId/addcomments', Middleware.addComments);
    userRouter.get('/posts/:postId/comments', Middleware.getComments);
    userRouter.post('/posts/:postId/like', Middleware.addLike);
    userRouter.delete('/posts/:postId/unlike', middleware.removeLike);
    userRouter.get('/posts/:postId/likes', Middleware.getLikes);
    userRouter.post('/comments/:postId/replies/:commentId', Middleware.addCommentReply);
    userRouter.get('/home/:userId', getHomePosts);
    userRouter.delete('/posts/:postId/delete', Middleware.deletePost);
    userRouter.post('/posts/:postId/save/:author', Middleware.savePost);
    return userRouter;
}
exports.default = UserRouter;
