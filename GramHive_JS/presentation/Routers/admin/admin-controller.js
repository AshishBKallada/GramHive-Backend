"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
adminRouter.post('/login', onLogin);
adminRouter.get('/users', onGetUsers);
adminRouter.get('/blockuser/:userId', onBlockUser);
exports.default = adminRouter;
