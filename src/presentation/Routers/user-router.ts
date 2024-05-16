import express from 'express';
import { userController } from '../Controllers/user-controller';
import { UserRepositoryImpl } from '../../domain/repositories/user-repository';
import { UserInteractorImpl } from '../../domain/usecases/userInteractor';
import { MailerImpl } from '../../domain/external-libraries/mailer';

const repository = new UserRepositoryImpl()
const mailer = new MailerImpl()
const interactor = new UserInteractorImpl(repository,mailer)
const controller = new userController(interactor)

const  userRouter = express.Router();

userRouter.post('/login', controller.login.bind(controller))
userRouter.post('/signup', controller.signup.bind(controller))
userRouter.post('/sendmail', controller.sendMail.bind(controller));
userRouter.post('/resendmail/:emailId', controller.resendMail.bind(controller));
userRouter.post('/verifyotp', controller.verifyOTP.bind(controller));
userRouter.get('/searchuser/:query', controller.searchUser.bind(controller))
userRouter.get('/getsearchuser/:userId', controller.getSearchUser.bind(controller));

export default userRouter;












