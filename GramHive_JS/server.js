"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./data/interfaces/data-sources/db-config");
const cookieParser = require('cookie-parser');
const routes_1 = __importDefault(require("./frameworks/routes"));
const app = (0, express_1.default)();
const cors = require('cors');
const port = 3000;
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_config_1.connectToMongoDB)();
(0, routes_1.default)(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
