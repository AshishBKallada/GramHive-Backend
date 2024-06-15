import express from 'express';
import { commentInteractorImpl } from '../../domain/usecases/commentInteractor';
import { CommentRepositoryImpl } from '../../domain/repositories/comment-repository';
import { CommentController } from '../Controllers/comment-controller';
import { NotificationRepositoryImpl } from '../../domain/repositories/notification-repository';
import { Server } from 'socket.io';
import { server } from '../../server';

const repository = new CommentRepositoryImpl()
const Notifirepository = new NotificationRepositoryImpl();
const io = new Server(server);

const interactor = new commentInteractorImpl(repository,Notifirepository,io)
const controller = new CommentController(interactor)
const commentRouter = express.Router();

commentRouter.post('/:postId/addcomments', controller.addComments.bind(controller))
commentRouter.get('/:postId/comments', controller.getComments.bind(controller));
commentRouter.post('/:postId/replies/:commentId', controller.addCommentReply.bind(controller));
commentRouter.delete('/:postId/:commentId', controller.deleteComment.bind(controller))
commentRouter.delete('/:postId/:commentId/replies/:replyId', controller.deleteCommentReply.bind(controller))

export default commentRouter;