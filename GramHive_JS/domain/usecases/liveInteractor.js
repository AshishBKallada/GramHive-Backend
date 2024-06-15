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
exports.LiveInteractorImpl = void 0;
class LiveInteractorImpl {
    constructor(repository) {
        this.repository = repository;
    }
    addLive(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.userId || !data.roomID) {
                throw new Error("userId and roomID are required");
            }
            try {
                yield this.repository.addLiveToDB(data);
            }
            catch (error) {
                console.error("Error adding live data:", error);
                throw new Error("Error adding live data");
            }
        });
    }
    removeLive(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error("userId is required");
            }
            try {
                yield this.repository.removeLiveFromDB(userId);
            }
            catch (error) {
                console.error("Error removing live data:", error);
                throw new Error("Error removing live data");
            }
        });
    }
}
exports.LiveInteractorImpl = LiveInteractorImpl;
