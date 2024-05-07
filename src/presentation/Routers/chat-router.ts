import express from 'express'
import { chatController } from '../Controllers/chat-controller';
import { ChatRepositoryImpl } from '../../domain/repositories/chat-repository';
import { chatInteractorImpl } from '../../domain/usecases/chatInteractor';
import userAuth from '../../Middlewares/authMiddleware';

const repository = new ChatRepositoryImpl();
const interactor = new chatInteractorImpl(repository);
const controller = new chatController(interactor);

const chatRouter = express.Router();

chatRouter.route('/:userId').get(userAuth, controller.accessChat.bind(controller));
chatRouter.route('/').post(userAuth, controller.fetchChat.bind(controller));
chatRouter.route('/group').post(userAuth, controller.createGroup.bind(controller));
chatRouter.route('/grouprename').post(userAuth, controller.renameGroup.bind(controller));
chatRouter.route('/group/add').put(userAuth, controller.addToGroup.bind(controller));
chatRouter.route('/group/remove').put(userAuth, controller.removeFromGroup.bind(controller));

export default chatRouter;