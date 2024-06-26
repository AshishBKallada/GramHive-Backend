import { Router } from 'express'
import userAuth from '../../middlewares/authMiddleware';
import { MessageRepositoryImpl } from '../../domain/repositories/message-repository';
import { MessageInteractorImpl } from '../../domain/usecases/messageInteractor';
import { messageController } from '../Controllers/message-controller';
import upload from '../../middlewares/fileshare-multer';
import { FileUploadMiddleware } from '../../middlewares/FileUploadMiddleware';
import { audioUploadMiddleware } from '../../middlewares/audioUploadMiddleware';

const repository = new MessageRepositoryImpl();
const interactor = new MessageInteractorImpl(repository)
const controller = new messageController(interactor);

const messageRouter: Router = Router();

messageRouter.post('/audio/:chatId', userAuth,audioUploadMiddleware,controller.onShareAudio.bind(controller));
messageRouter.route('/:chatId').post(userAuth, controller.onSendMessage.bind(controller));
messageRouter.route('/:chatId').get(userAuth, controller.onAllMessages.bind(controller));
messageRouter.route('/delete/:Id').put(userAuth, controller.onDeleteMessage.bind(controller));
messageRouter.post('/sharefile/:chatId', upload, FileUploadMiddleware, userAuth, controller.onShareFiles.bind(controller));

export default messageRouter; 