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
exports.AdReporsitoryImpl = void 0;
const ad_1 = __importDefault(require("../../data/data-sources/mongodb/models/ad"));
class AdReporsitoryImpl {
    savenewAd(newAd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedAd = yield ad_1.default.create(newAd);
                return savedAd;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    confirmPay(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Ad = yield ad_1.default.findByIdAndUpdate(Id, { payment: 'paid' });
                return Ad;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    getAds(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Ads = yield ad_1.default.find({ user: Id });
                return Ads;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    getHomeAds() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Ads = yield ad_1.default.find({});
                return Ads;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
exports.AdReporsitoryImpl = AdReporsitoryImpl;
