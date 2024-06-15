import { Router } from "express";
import userAuth from "../../Middlewares/authMiddleware";
import { LiveRepositoryImpl } from "../../domain/repositories/live-repository";
import { LiveInteractorImpl } from "../../domain/usecases/liveInteractor";
import { LiveController } from "../Controllers/live-controller";



const repository = new LiveRepositoryImpl();
const interactor = new LiveInteractorImpl(repository);
const controller = new LiveController(interactor);

export const liveRouter: Router = Router();

liveRouter.post('/addlive', userAuth, controller.onAddLive.bind(controller));
liveRouter.delete('/removelive', userAuth, controller.onRemoveLive.bind(controller));