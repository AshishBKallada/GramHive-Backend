"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../Middlewares/authMiddleware"));
const message_repository_1 = require("../../domain/repositories/message-repository");
const messageInteractor_1 = require("../../domain/usecases/messageInteractor");
const message_controller_1 = require("../Controllers/message-controller");
const repository = new message_repository_1.MessageRepositoryImpl();
const interactor = new messageInteractor_1.MessageInteractorImpl(repository);
const controller = new message_controller_1.messageController(interactor);
const messageRouter = (0, express_1.Router)();
messageRouter.route('/:chatId').post(authMiddleware_1.default, controller.onSendMessage.bind(controller));
messageRouter.route('/:chatId').get(authMiddleware_1.default, controller.onAllMessages.bind(controller));
exports.default = messageRouter;
