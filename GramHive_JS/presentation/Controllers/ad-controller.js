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
exports.AdController = void 0;
class AdController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onNewAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = req.body;
            const user = req.user._id;
            formData.images = formData.images.map((img, index) => {
                return Object.assign(Object.assign({}, img), { imageFile: req.imageUrls[index] });
            });
            formData.user = user;
            try {
                const { order, Id } = yield this.interactor.addnewAd(formData);
                return res.status(201).json({ order, Id });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    onConfirmPay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Id = req.params.Id;
                const Ad = yield this.interactor.confirmPay(Id);
                return res.status(200).json(Ad);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    onGetAds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const Ads = yield this.interactor.getAds(userId);
                return res.status(200).json(Ads);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    onGetHomeAds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Ads = yield this.interactor.getHomeAds();
                return res.status(200).json(Ads);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.AdController = AdController;
