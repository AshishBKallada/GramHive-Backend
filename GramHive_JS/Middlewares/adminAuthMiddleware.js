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
const admin_1 = __importDefault(require("../data/data-sources/mongodb/models/admin"));
const jwt = require("jsonwebtoken");
const adminAuth = (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return res.json({ statu: false });
    }
    jwt.verify(token, 'shaantha_UK', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.json({ statu: false });
        }
        else {
            try {
                const adminId = data.adminId.toString();
                const isAdmin = yield admin_1.default.findOne({ email: adminId });
                if (isAdmin) {
                    console.log('Admin found', isAdmin);
                    next();
                }
                else {
                    return res.json({ status: false });
                }
            }
            catch (error) {
                console.error('Error finding admin:', error);
                return res.json({ status: false });
            }
        }
    }));
};
exports.default = adminAuth;
