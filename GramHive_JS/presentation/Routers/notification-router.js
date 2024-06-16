"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const notification_repository_1 = require("../../domain/repositories/notification-repository");
const notification_controller_1 = require("../Controllers/notification-controller");
const notificationInteractor_1 = require("../../domain/usecases/notificationInteractor");
const notificationValidator_1 = require("../../validators/notificationValidator");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const notificationRouter = (0, express_1.Router)();
const repository = new notification_repository_1.NotificationRepositoryImpl();
const interactor = new notificationInteractor_1.NotificationInteractor(repository);
const controller = new notification_controller_1.NotificationController(interactor);
notificationRouter.get('/', authMiddleware_1.default, controller.onGetNotifications.bind(controller));
notificationRouter.put('/update', authMiddleware_1.default, notificationValidator_1.notificationValidationRules.updateNotifications, validationMiddleware_1.handleValidationErrors, controller.onUpdateNotifications.bind(controller));
exports.default = notificationRouter;
