import express from 'express';
import { commentInteractorImpl } from '../../domain/usecases/commentInteractor';
import { CommentRepositoryImpl } from '../../domain/repositories/comment-repository';
import { CommentController } from '../Controllers/comment-controller';

const repository = new CommentRepositoryImpl()
const interactor = new commentInteractorImpl(repository)
const controller = new CommentController(interactor)

const commentRouter = express.Router();

commentRouter.post('/:postId/addcomments', controller.addComments.bind(controller))
commentRouter.get('/:postId/comments', controller.getComments.bind(controller));
commentRouter.post('/:postId/replies/:commentId', controller.addCommentReply.bind(controller));
commentRouter.delete('/:postId/:commentId', controller.deleteComment.bind(controller))
commentRouter.delete('/:postId/:commentId/replies/:replyId', controller.deleteCommentReply.bind(controller))

export default commentRouter;