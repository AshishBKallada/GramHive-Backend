import { Router } from "express";
import userAuth from "../../Middlewares/authMiddleware";
import { ReportReporsitoryImpl } from "../../domain/repositories/report-repository";
import { ReportInteractorImpl } from "../../domain/usecases/reportInteractor";
import { ReportController } from "../Controllers/report-controller";

const repository = new ReportReporsitoryImpl();
const interactor = new ReportInteractorImpl(repository);
const controller = new ReportController(interactor);

const reportRouter: Router = Router();

reportRouter.post('/content', userAuth, controller.onReportContent.bind(controller));
reportRouter.post('/user/:Id', userAuth, controller.onReportUser.bind(controller));
reportRouter.post('/post/:Id', userAuth, controller.onReportPost.bind(controller));
reportRouter.post('/addfeedback', userAuth, controller.onReportFeedback.bind(controller));

export default reportRouter;