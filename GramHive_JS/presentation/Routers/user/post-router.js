"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../../Middlewares/authMiddleware"));
const cloudinaryConfig_1 = __importDefault(require("../../../Middlewares/cloudinaryConfig"));
const multerConfig_1 = __importDefault(require("../../../Middlewares/multerConfig"));
const post_controller_1 = require("../../Controllers/user/post-controller");
const post_repository_1 = require("../../../domain/repositories/user/post-repository");
const postInteractor_1 = require("../../../domain/usecases/user/postInteractor");
const repository = new post_repository_1.PostRepositoryImpl();
const interactor = new postInteractor_1.postInteractorImpl(repository);
const controller = new post_controller_1.PostController(interactor);
const postRouter = express_1.default.Router();
postRouter.post('/addpost/:userId', authMiddleware_1.default, multerConfig_1.default, cloudinaryConfig_1.default, controller.addPost.bind(controller));
postRouter.post('/:postId/like', controller.addLike.bind(controller));
postRouter.delete('/:postId/unlike', controller.removeLike.bind(controller));
postRouter.get('/:postId/likes', controller.getLikes.bind(controller));
postRouter.get('/home/:userId', controller.getHomePosts.bind(controller));
postRouter.delete('/:postId/delete', controller.deletePost.bind(controller));
postRouter.post('/:postId/save/:author', controller.savePost.bind(controller));
exports.default = postRouter;
