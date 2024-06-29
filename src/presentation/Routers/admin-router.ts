import express from "express";
import { AdminController } from "../Controllers/admin-controller";
import { AdminRepositoryImpl } from "../../domain/repositories/admin-repository";
import { AdminInteractorImpl } from "../../domain/usecases/adminInteractor";
import { AuthService } from "../../domain/services/admin/AuthService";
import { adminAuthMiddleware } from "../../middlewares/adminAuthMiddleware";

const repository = new AdminRepositoryImpl();
const authService = new AuthService();
const interactor = new AdminInteractorImpl(repository, authService)
const controller = new AdminController(interactor)

const adminRouter = express.Router();

adminRouter.post('/login', controller.onLogin.bind(controller))
adminRouter.get('/users', adminAuthMiddleware,controller.onGetUsers.bind(controller));
adminRouter.get('/blockuser/:userId',adminAuthMiddleware, controller.onBlockUser.bind(controller));
adminRouter.get('/reviews/:filter',adminAuthMiddleware, controller.onGetReviews.bind(controller));
adminRouter.get('/postreports',adminAuthMiddleware, controller.onPostReports.bind(controller));
adminRouter.post('/banpost/:postId',adminAuthMiddleware, controller.onPostBan.bind(controller));
adminRouter.get('/userreports',adminAuthMiddleware, controller.onUserReports.bind(controller));
adminRouter.get('/transactions',adminAuthMiddleware, controller.onGetTransactions.bind(controller));
adminRouter.get('/dashboard',adminAuthMiddleware, controller.onDashboard.bind(controller));
adminRouter.get('/chartone',adminAuthMiddleware, controller.onChartOne.bind(controller));
adminRouter.get('/charttwo',adminAuthMiddleware, controller.onChartTwo.bind(controller));



export default adminRouter;

