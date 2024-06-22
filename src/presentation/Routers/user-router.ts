import express from 'express';
import { userController } from '../Controllers/user-controller';
import { UserRepositoryImpl } from '../../domain/repositories/user-repository';
import { UserInteractorImpl } from '../../domain/usecases/userInteractor';
import { MailerImpl } from '../../domain/external-libraries/mailer';
import userAuth from '../../middlewares/authMiddleware';
import { handleValidationErrors } from '../../middlewares/validationMiddleware';
import { userValidationRules } from '../../validators/userValidator';
import { TokenRepositoryImpl } from '../../domain/repositories/token-repository';

const repository = new UserRepositoryImpl()
const tokenRepository = new TokenRepositoryImpl()
const mailer = new MailerImpl()
const interactor = new UserInteractorImpl(repository, tokenRepository, mailer)
const controller = new userController(interactor)

const userRouter = express.Router();
userRouter.put('/reset-password', controller.onResetPassword.bind(controller));
userRouter.post('/forgot-pass', controller.onForgotPassword.bind(controller));
userRouter.post('/auth/refresh-token', controller.onRefreshTokens.bind(controller));
userRouter.post('/auth/google', controller.onGoogleAuth.bind(controller));
userRouter.post('/login',controller.login.bind(controller));
userRouter.post('/signup', controller.signup.bind(controller));
userRouter.post('/check-email', userValidationRules.checkEmail, handleValidationErrors, controller.onCheckEmail.bind(controller));
userRouter.post('/sendmail', userValidationRules.sendMail, handleValidationErrors, controller.sendMail.bind(controller));
userRouter.post('/resendmail/:emailId', userValidationRules.resendMail, handleValidationErrors, controller.resendMail.bind(controller));
userRouter.post('/verifyotp', userValidationRules.verifyOTP, handleValidationErrors, controller.verifyOTP.bind(controller));
userRouter.get('/searchuser/:query', userValidationRules.searchUser, handleValidationErrors, controller.searchUser.bind(controller));
userRouter.get('/getsearchuser/:userId', userValidationRules.getSearchUser, handleValidationErrors, controller.getSearchUser.bind(controller));
userRouter.post('/updatelocation', controller.onUpdatelocation.bind(controller));
userRouter.get('/getlocations', controller.onGetLocations.bind(controller));
userRouter.get('/getsuggestions', controller.onGetSuggestions.bind(controller));

export default userRouter;












