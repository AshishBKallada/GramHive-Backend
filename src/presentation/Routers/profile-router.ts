import express from 'express';
import userAuth from "../../Middlewares/authMiddleware";
import processUpload from "../../Middlewares/multerProfile";
import uploadToCloudinary from "../../Middlewares/cloudinaryConfig";

import { profileController } from "../Controllers/profile-controller";
import { profileRepositoryImpl } from '../../domain/repositories/proile-repository';
import { profileInteractorImpl } from '../../domain/usecases/profileInteractor';
import { NotificationRepositoryImpl } from '../../domain/repositories/notification-repository';

const repository = new profileRepositoryImpl()
const NotiRepository = new NotificationRepositoryImpl();
const interactor = new profileInteractorImpl(repository,NotiRepository)
const controller = new profileController(interactor)

const profileRouter = express.Router();

profileRouter.post('/update', processUpload, uploadToCloudinary, controller.updateProfile.bind(controller));
profileRouter.get('/:userId', controller.onGetProfileData.bind(controller))
profileRouter.post('/followuser',controller.followUser.bind(controller));
profileRouter.post('/unfollowuser', controller.unfollowUser.bind(controller))
profileRouter.get('/:userId/getFollowers', controller.onGetFollowers.bind(controller))
profileRouter.get('/:userId/getFollowing', controller.onGetFollowing.bind(controller))
profileRouter.delete('/:userId/removefollower', controller.onRemoveFollower.bind(controller))
profileRouter.get('/saved/:userId', controller.onGetSaved.bind(controller))

export default profileRouter;
