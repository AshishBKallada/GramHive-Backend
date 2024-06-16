import express from 'express';
import { userController } from '../Controllers/user-controller';
import { UserRepositoryImpl } from '../../domain/repositories/user-repository';
import { UserInteractorImpl } from '../../domain/usecases/userInteractor';
import { MailerImpl } from '../../domain/external-libraries/mailer';
import userAuth from '../../middlewares/authMiddleware';
import { handleValidationErrors } from '../../middlewares/validationMiddleware';
import { userValidationRules } from '../../validators/userValidator';

const repository = new UserRepositoryImpl()
const mailer = new MailerImpl()
const interactor = new UserInteractorImpl(repository, mailer)
const controller = new userController(interactor)

const userRouter = express.Router();

userRouter.post('/login', userValidationRules.login, handleValidationErrors, controller.login.bind(controller));
userRouter.post('/signup', userValidationRules.signup, handleValidationErrors, controller.signup.bind(controller));
userRouter.post('/check-email', userValidationRules.checkEmail, handleValidationErrors, controller.onCheckEmail.bind(controller));
userRouter.post('/sendmail', userValidationRules.sendMail, handleValidationErrors, controller.sendMail.bind(controller));
userRouter.post('/resendmail/:emailId', userValidationRules.resendMail, handleValidationErrors, controller.resendMail.bind(controller));
userRouter.post('/verifyotp', userValidationRules.verifyOTP, handleValidationErrors, controller.verifyOTP.bind(controller));
userRouter.get('/searchuser/:query', userValidationRules.searchUser, handleValidationErrors, controller.searchUser.bind(controller));
userRouter.get('/getsearchuser/:userId', userValidationRules.getSearchUser, handleValidationErrors, controller.getSearchUser.bind(controller));
userRouter.post('/updatelocation', userValidationRules.updateLocation, handleValidationErrors, controller.onUpdatelocation.bind(controller));
userRouter.get('/getlocations', controller.onGetLocations.bind(controller));
userRouter.get('/getsuggestions', controller.onGetSuggestions.bind(controller));

export default userRouter;












