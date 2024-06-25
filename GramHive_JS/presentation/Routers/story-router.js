"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const story_repository_1 = require("../../domain/repositories/story-repository");
const storyInteractor_1 = require("../../domain/usecases/storyInteractor");
const story_controller_1 = require("../Controllers/story-controller");
const storyUploadMiddleware_1 = __importDefault(require("../../middlewares/storyUploadMiddleware"));
const storyUploader_1 = require("../../domain/external-libraries/storyUploader");
const storyRouter = express_1.default.Router();
const repository = new story_repository_1.StoryRepositoryimpl();
const uploader = new storyUploader_1.StoryUploaderImpl();
const interactor = new storyInteractor_1.storyInteractorImpl(repository, uploader);
const controller = new story_controller_1.storyController(interactor);
storyRouter.post('/upload/:userId', storyUploadMiddleware_1.default, controller.addStory.bind(controller));
storyRouter.get('/:userId/getstories', controller.onGetStories.bind(controller));
exports.default = storyRouter;
