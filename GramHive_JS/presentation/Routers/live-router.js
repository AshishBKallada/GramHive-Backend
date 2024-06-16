"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const live_repository_1 = require("../../domain/repositories/live-repository");
const liveInteractor_1 = require("../../domain/usecases/liveInteractor");
const live_controller_1 = require("../Controllers/live-controller");
const liveValidator_1 = require("../../validators/liveValidator");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const repository = new live_repository_1.LiveRepositoryImpl();
const interactor = new liveInteractor_1.LiveInteractorImpl(repository);
const controller = new live_controller_1.LiveController(interactor);
exports.liveRouter = (0, express_1.Router)();
exports.liveRouter.post('/addlive', authMiddleware_1.default, liveValidator_1.liveValidationRules.addLive, validationMiddleware_1.handleValidationErrors, controller.onAddLive.bind(controller));
exports.liveRouter.delete('/removelive/:userId', authMiddleware_1.default, liveValidator_1.liveValidationRules.removeLive, validationMiddleware_1.handleValidationErrors, controller.onRemoveLive.bind(controller));
