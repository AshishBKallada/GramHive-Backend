import { Router } from "express";
import userAuth from "../../middlewares/authMiddleware";
import { LiveRepositoryImpl } from "../../domain/repositories/live-repository";
import { LiveInteractorImpl } from "../../domain/usecases/liveInteractor";
import { LiveController } from "../Controllers/live-controller";
import { liveValidationRules } from "../../validators/liveValidator";
import { handleValidationErrors } from "../../middlewares/validationMiddleware";

const repository = new LiveRepositoryImpl();
const interactor = new LiveInteractorImpl(repository);
const controller = new LiveController(interactor);

export const liveRouter: Router = Router();

liveRouter.post('/addlive', userAuth, liveValidationRules.addLive, handleValidationErrors, controller.onAddLive.bind(controller));
liveRouter.delete('/removelive/:userId', userAuth, liveValidationRules.removeLive, handleValidationErrors, controller.onRemoveLive.bind(controller));
