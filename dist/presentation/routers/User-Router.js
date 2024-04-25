"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
function UserRouter(userService) {
    const userRouter = express_1.default.Router();
    userRouter.post('/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Login Controller');
            console.log('logindata', req.body);
            const { username, password } = req.body;
            const user = yield userService.login({ username, password });
            if (user) {
                console.log('userRouter:', user);
                res.status(200).send('User is Valid');
            }
            else {
                res.status(401).send('Invalid username or password');
            }
        }
        catch (e) {
            console.error('Error during login:', e);
            res.status(500).send('Internal server error');
        }
    }));
    userRouter.get('/signup', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password, email } = req.body;
            const newUser = yield userService.signup({ username, password, email });
            res.status(201).send(newUser);
        }
        catch (e) {
            console.error('Error during signup:', e);
            res.status(500).send('Internal server error');
        }
    }));
    return userRouter;
}
exports.default = UserRouter;
