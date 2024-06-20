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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepositoryImpl = void 0;
const accessToken_generator_1 = require("../../functions/accessToken-generator");
const refreshToken_generator_1 = require("../../functions/refreshToken-generator");
const verify_refreshToken_1 = require("../../functions/verify-refreshToken");
class TokenRepositoryImpl {
    generateTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = (0, accessToken_generator_1.generateAccessToken)(user);
            const refreshToken = (0, refreshToken_generator_1.generateRefreshToken)(user);
            return { accessToken, refreshToken };
        });
    }
    verifyRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, verify_refreshToken_1.verifyRefreshToken)(token);
        });
    }
}
exports.TokenRepositoryImpl = TokenRepositoryImpl;
