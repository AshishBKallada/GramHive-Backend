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
exports.LiveRepositoryImpl = void 0;
const live_1 = require("../../data/data-sources/mongodb/models/live");
class LiveRepositoryImpl {
    addLiveToDB(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const liveStreamData = new live_1.LiveModel(data);
            try {
                yield liveStreamData.save();
            }
            catch (error) {
                console.error("Error saving live data:", error);
                throw new Error("Error adding live data");
            }
        });
    }
    removeLiveFromDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield live_1.LiveModel.findByIdAndDelete(userId);
            }
            catch (error) {
                console.error("Error saving live data:", error);
                throw new Error("Error adding live data");
            }
        });
    }
}
exports.LiveRepositoryImpl = LiveRepositoryImpl;
