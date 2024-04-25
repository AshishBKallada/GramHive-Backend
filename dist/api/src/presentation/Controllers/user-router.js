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
const multerConfig_1 = require("../../../Middlewares/multerConfig");
function UserRouter(userService) {
    const userRouter = express_1.default.Router();
    userRouter.post('/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Login Controller');
            console.log('logindata', req.body);
            const { username, password } = req.body;
            const { user, token } = yield userService.login({ username, password });
            if (user) {
                console.log('userController:', user, 'Token', token);
                res.status(200).json({ message: 'Login successful', user, token: token });
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
    userRouter.post('/signup', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, name, username, password, image } = req.body;
            const { user, token } = yield userService.signup({ username, name, password, email, image: image ? image : 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' });
            console.log('returned ' + user, token);
            res.status(200).json({ message: 'Signup successful', user, token });
        }
        catch (e) {
            console.error('Error during signup:', e);
            res.status(500).send('Internal server error');
        }
    }));
    userRouter.post('/updateprofile', multerConfig_1.multerUploads, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        console.log('111111111111111111111');
        try {
            console.log('req body', req.body);
            const { userId, username, name, website, bio, image, gender } = req.body;
            const { success } = yield userService.updateProfile({ userId, username, name, website, bio, image, gender });
            if (success) {
                res.status(200).json({ message: 'Profile updated successfully', success });
            }
            else {
                res.status(500).json({ message: 'Failed to update profile', success });
            }
        }
        catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ message: 'An error occurred while updating profile', success: false });
        }
    }));
    userRouter.post('/addpost', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        console.log('33333333');
        console.log(req.body);
        res.status(200).json({ message: 'Post added successfully', success: true });
    }));
    return userRouter;
}
exports.default = UserRouter;
