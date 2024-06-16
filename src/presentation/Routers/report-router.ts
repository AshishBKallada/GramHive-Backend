import { Router } from "express";
import userAuth from "../../middlewares/authMiddleware";
import { ReportReporsitoryImpl } from "../../domain/repositories/report-repository";
import { ReportInteractorImpl } from "../../domain/usecases/reportInteractor";
import { ReportController } from "../Controllers/report-controller";
import { reportValidationRules } from "../../validators/reportValidator";
import { handleValidationErrors } from "../../middlewares/validationMiddleware";

const repository = new ReportReporsitoryImpl();
const interactor = new ReportInteractorImpl(repository);
const controller = new ReportController(interactor);

const reportRouter: Router = Router();

reportRouter.post('/content', userAuth, reportValidationRules.reportContent, handleValidationErrors, controller.onReportContent.bind(controller));
reportRouter.post('/user/:Id', userAuth, reportValidationRules.reportUser, handleValidationErrors, controller.onReportUser.bind(controller));
reportRouter.post('/post/:Id', userAuth, reportValidationRules.reportPost, handleValidationErrors, controller.onReportPost.bind(controller));
reportRouter.post('/addfeedback', userAuth, reportValidationRules.reportFeedback, handleValidationErrors, controller.onReportFeedback.bind(controller));

export default reportRouter;