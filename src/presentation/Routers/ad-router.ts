import { Router } from "express";
import { AdReporsitoryImpl } from "../../domain/repositories/ad-repository";
import { AdInteractorImpl } from "../../domain/usecases/adInteractor";
import { AdController } from "../Controllers/ad-controller";
import userAuth from "../../Middlewares/authMiddleware";
import multeradUploadMiddleware from "../../Middlewares/multeradUploadMiddleware";
import { adUploadMiddleware } from "../../Middlewares/adUploadMiddleware";
import { RazorpayOrderImpl } from "../../domain/external-libraries/razorpayOrderCreator";

const adRouter: Router = Router();

const repository = new AdReporsitoryImpl();
const Razorpay = new RazorpayOrderImpl();
const interactor = new AdInteractorImpl(repository, Razorpay);
const controller = new AdController(interactor);

adRouter.post('/addAd', userAuth, multeradUploadMiddleware, adUploadMiddleware, controller.onNewAdd.bind(controller));
adRouter.put('/confirmpay/:Id', userAuth, controller.onConfirmPay.bind(controller));
adRouter.get('/getads', userAuth, controller.onGetAds.bind(controller));
adRouter.get('/gethomeads', userAuth, controller.onGetHomeAds.bind(controller));


export default adRouter;