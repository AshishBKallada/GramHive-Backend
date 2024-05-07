"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const user_1 = __importDefault(require("../data/data-sources/mongodb/models/user"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        console.log('111111111111');
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const [bearer, token] = authorizationHeader.split(' ');
    if (!token || bearer.toLowerCase() !== 'bearer') {
        console.log('2222222222222222');
        return res.status(401).json({ message: 'Invalid Authorization header format' });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, 'thadavil__aanu');
        console.log('Decoded Token:', decodedToken);
        if (decodedToken.exp * 1000 < Date.now()) {
            console.log('333333333333');
            return res.status(401).json({ message: 'Token expired' });
        }
        const userIdString = decodedToken.userId.toString();
        console.log('userIdString', userIdString);
        const user = yield user_1.default.findOne({ _id: userIdString });
        if (user) {
            if (user.isBan) {
                console.log('44444444444444');
                return res.status(403).json({ message: 'User is blocked' });
            }
            req.user = user;
            next();
        }
        else {
            console.log('55555555555');
            return res.status(401).json({ message: 'Invalid user' });
        }
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            console.log('66666666666');
            return res.status(401).json({ message: 'TokenExpiredError' });
        }
        console.error('Error:', error);
        console.log('7777777777777777');
        return res.status(401).json({ message: 'Invalid token' });
    }
});
exports.default = userAuth;
