import express from 'express';
import userAuth from "../../Middlewares/authMiddleware";
import processUpload from "../../Middlewares/multerProfile";
import uploadToCloudinary from "../../Middlewares/cloudinaryConfig";

import { profileController } from "../Controllers/profile-controller";
import { profileRepositoryImpl } from '../../domain/repositories/proile-repository';
import { profileInteractorImpl } from '../../domain/usecases/profileInteractor';

const repository = new profileRepositoryImpl()
const interactor = new profileInteractorImpl(repository)
const controller = new profileController(interactor)

const profileRouter = express.Router();

profileRouter.post('/update', userAuth, processUpload, uploadToCloudinary, controller.updateProfile.bind(controller));
profileRouter.get('/:userId', userAuth, controller.onGetProfileData.bind(controller))
profileRouter.post('/followuser', controller.followUser.bind(controller));
profileRouter.post('/unfollowuser', controller.unfollowUser.bind(controller))
profileRouter.get('/:userId/getFollowers', controller.onGetFollowers.bind(controller))
profileRouter.get('/:userId/getFollowing', controller.onGetFollowing.bind(controller))

export default profileRouter;
