import express from 'express';
import userAuth from "../../Middlewares/authMiddleware";
import uploadToCloudinary from "../../Middlewares/cloudinaryConfig";
import upload from "../../Middlewares/multerConfig";

import { PostController } from '../Controllers/post-controller';
import { PostRepositoryImpl } from '../../domain/repositories/post-repository';
import { postInteractorImpl } from '../../domain/usecases/postInteractor';

const repository = new PostRepositoryImpl()
const interactor = new postInteractorImpl(repository)
const controller = new PostController(interactor)

const postRouter = express.Router();


postRouter.post('/addpost/:userId', userAuth, upload, uploadToCloudinary, controller.addPost.bind(controller));
postRouter.post('/:postId/like', controller.addLike.bind(controller));
postRouter.delete('/:postId/unlike', controller.removeLike.bind(controller));
postRouter.get('/:postId/likes', controller.getLikes.bind(controller));
postRouter.get('/home/:userId', controller.getHomePosts.bind(controller))
postRouter.delete('/:postId/delete', controller.deletePost.bind(controller));
postRouter.post('/:postId/save/:author', controller.savePost.bind(controller));

export default postRouter;
