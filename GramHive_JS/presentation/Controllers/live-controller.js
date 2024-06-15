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
exports.LiveController = void 0;
class LiveController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onAddLive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body.liveStreamData;
                console.log('DTAA', data);
                yield this.interactor.addLive(data);
                return res.status(201).json({ message: "Live data added successfully" });
            }
            catch (error) {
                console.error("Error adding live data:", error);
                return res.status(400).json({ message: error.message });
            }
        });
    }
    onRemoveLive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                yield this.interactor.removeLive(userId);
                return res.status(201).json({ message: "Live data removed successfully" });
            }
            catch (error) {
                console.error("Error removing live data:", error);
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.LiveController = LiveController;
