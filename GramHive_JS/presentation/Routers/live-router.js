"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../Middlewares/authMiddleware"));
const live_repository_1 = require("../../domain/repositories/live-repository");
const liveInteractor_1 = require("../../domain/usecases/liveInteractor");
const live_controller_1 = require("../Controllers/live-controller");
const repository = new live_repository_1.LiveRepositoryImpl();
const interactor = new liveInteractor_1.LiveInteractorImpl(repository);
const controller = new live_controller_1.LiveController(interactor);
exports.liveRouter = (0, express_1.Router)();
exports.liveRouter.post('/addlive', authMiddleware_1.default, controller.onAddLive.bind(controller));
exports.liveRouter.delete('/removelive', authMiddleware_1.default, controller.onRemoveLive.bind(controller));
