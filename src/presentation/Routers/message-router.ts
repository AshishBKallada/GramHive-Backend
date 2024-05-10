import {Router} from 'express'
import userAuth from '../../Middlewares/authMiddleware';
import { MessageRepositoryImpl } from '../../domain/repositories/message-repository';
import { MessageInteractorImpl } from '../../domain/usecases/messageInteractor';
import { messageController } from '../Controllers/message-controller';

const repository = new MessageRepositoryImpl();
const interactor = new MessageInteractorImpl(repository)
const controller = new messageController(interactor);

const messageRouter:Router= Router();

messageRouter.route('/:chatId').post(userAuth,controller.onSendMessage.bind(controller));
messageRouter.route('/:chatId').get(userAuth,controller.onAllMessages.bind(controller));


export default messageRouter;