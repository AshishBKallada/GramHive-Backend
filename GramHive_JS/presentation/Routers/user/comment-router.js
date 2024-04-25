"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentInteractor_1 = require("../../../domain/usecases/user/commentInteractor");
const comment_repository_1 = require("../../../domain/repositories/user/comment-repository");
const comment_controller_1 = require("../../Controllers/user/comment-controller");
const repository = new comment_repository_1.CommentRepositoryImpl();
const interactor = new commentInteractor_1.commentInteractorImpl(repository);
const controller = new comment_controller_1.CommentController(interactor);
const commentRouter = express_1.default.Router();
commentRouter.post('/:postId/addcomments', controller.addComments.bind(controller));
commentRouter.get('/:postId/comments', controller.getComments.bind(controller));
commentRouter.post('/:postId/replies/:commentId', controller.addCommentReply.bind(controller));
exports.default = commentRouter;
