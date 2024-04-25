"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../../Controllers/admin/admin-controller");
const admin_repository_1 = require("../../../domain/repositories/admin/admin-repository");
const adminInteractor_1 = require("../../../domain/usecases/admin/adminInteractor");
const repository = new admin_repository_1.AdminRepositoryImpl();
const interactor = new adminInteractor_1.AdminInteractorImpl(repository);
const controller = new admin_controller_1.AdminController(interactor);
const adminRouter = express_1.default.Router();
adminRouter.post('/login', controller.onLogin.bind(controller));
adminRouter.get('/users', controller.onGetUsers.bind(controller));
adminRouter.get('/blockuser/:userId', controller.onBlockUser.bind(controller));
exports.default = adminRouter;
