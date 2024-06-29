import express from 'express';
import { StoryRepositoryimpl } from '../../domain/repositories/story-repository';
import { storyInteractorImpl } from '../../domain/usecases/storyInteractor';
import { storyController } from '../Controllers/story-controller';
import storyUploadMiddleware from '../../middlewares/storyUploadMiddleware';
import { StoryUploaderImpl } from '../../domain/external-libraries/storyUploader';
import { storyValidationRules } from '../../validators/storyValidator';
import { handleValidationErrors } from '../../middlewares/validationMiddleware';

const storyRouter = express.Router();


const repository = new StoryRepositoryimpl()
const uploader = new StoryUploaderImpl()
const interactor = new storyInteractorImpl(repository,uploader)
const controller = new storyController(interactor)

storyRouter.post('/upload/:userId', storyUploadMiddleware, controller.addStory.bind(controller));
storyRouter.get('/:userId/getstories', controller.onGetStories.bind(controller));
storyRouter.get('/updateview', controller.onUpdateViews.bind(controller));


export default storyRouter;
