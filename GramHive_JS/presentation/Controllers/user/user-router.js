"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes = (Service) => {
    const userRouter = express_1.default.Router();
    userRouter.post('/login', Middleware.login);
    userRouter.post('/signup', Middleware.signup);
    userRouter.post('/sendmail', Middleware.sendMail);
    userRouter.post('/verifyotp', Middleware.verifyOTP);
    userRouter.get('/searchuser/:query', Middleware.searchUser);
    userRouter.get('/getsearchuser/:userId', Middleware.getSearchUser);
    return userRouter;
};
