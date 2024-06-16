import express from 'express'
import { chatController } from '../Controllers/chat-controller';
import { ChatRepositoryImpl } from '../../domain/repositories/chat-repository';
import { chatInteractorImpl } from '../../domain/usecases/chatInteractor';
import userAuth from '../../middlewares/authMiddleware';

const repository = new ChatRepositoryImpl();
const interactor = new chatInteractorImpl(repository);
const controller = new chatController(interactor);

const chatRouter = express.Router();

chatRouter.route('/:userId').get(userAuth, controller.accessChat.bind(controller));
chatRouter.route('/').post(userAuth, controller.fetchChat.bind(controller));
chatRouter.route('/group').post(userAuth, controller.createGroup.bind(controller));
chatRouter.route('/grouprename/:groupId').put(userAuth, controller.renameGroup.bind(controller));
chatRouter.route('/groupadd/:groupId').put(userAuth, controller.addToGroup.bind(controller));
chatRouter.route('/groupremove/:groupId').put(userAuth, controller.removeFromGroup.bind(controller));
chatRouter.route('/deletegroup/:groupId').delete(userAuth, controller.deleteGroup.bind(controller));

export default chatRouter;