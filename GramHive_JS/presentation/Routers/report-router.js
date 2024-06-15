"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../Middlewares/authMiddleware"));
const report_repository_1 = require("../../domain/repositories/report-repository");
const reportInteractor_1 = require("../../domain/usecases/reportInteractor");
const report_controller_1 = require("../Controllers/report-controller");
const repository = new report_repository_1.ReportReporsitoryImpl();
const interactor = new reportInteractor_1.ReportInteractorImpl(repository);
const controller = new report_controller_1.ReportController(interactor);
const reportRouter = (0, express_1.Router)();
reportRouter.post('/content', authMiddleware_1.default, controller.onReportContent.bind(controller));
reportRouter.post('/user/:Id', authMiddleware_1.default, controller.onReportUser.bind(controller));
reportRouter.post('/post/:Id', authMiddleware_1.default, controller.onReportPost.bind(controller));
reportRouter.post('/addfeedback', authMiddleware_1.default, controller.onReportFeedback.bind(controller));
exports.default = reportRouter;
