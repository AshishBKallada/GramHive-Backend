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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../data/data-sources/mongodb/models/user"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    jsonwebtoken_1.default.verify(token, 'thadavil__aanu', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        else {
            console.log('Data----------------------------', data);
            try {
                console.log(data.userId);
                const userIdString = data.userId.toString();
                const user = yield user_1.default.findOne({ email: userIdString });
                if (user) {
                    console.log(user);
                    if (user.isBan) {
                        return res.status(403).json({ message: 'User is blocked' });
                    }
                    next();
                }
                else {
                    return res.status(401).json({ message: 'Invalid user' });
                }
            }
            catch (error) {
                console.error('Error finding user:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    }));
});
exports.default = userAuth;
