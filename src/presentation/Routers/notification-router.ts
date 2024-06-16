import { Router } from "express";
import userAuth from "../../middlewares/authMiddleware";
import { NotificationRepositoryImpl } from "../../domain/repositories/notification-repository";
import { NotificationController } from "../Controllers/notification-controller";
import { NotificationInteractor } from "../../domain/usecases/notificationInteractor";
import { notificationValidationRules } from "../../validators/notificationValidator";
import { handleValidationErrors } from "../../middlewares/validationMiddleware";

const notificationRouter:Router=Router();

const repository = new NotificationRepositoryImpl();
const interactor  = new NotificationInteractor(repository);
const controller = new NotificationController(interactor);


notificationRouter.get('/', userAuth, controller.onGetNotifications.bind(controller));
notificationRouter.put('/update', userAuth, notificationValidationRules.updateNotifications, handleValidationErrors, controller.onUpdateNotifications.bind(controller));

export default notificationRouter;