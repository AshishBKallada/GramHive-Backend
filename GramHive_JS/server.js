"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./config/db-config");
const routes_1 = __importDefault(require("./Routes/routes"));
const server_1 = __importDefault(require("./config/server"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socketConfig_1 = require("./config/socketConfig");
const helmet_1 = __importDefault(require("helmet"));
const rateLimiter_1 = require("./middlewares/rateLimiter");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const compression_1 = __importDefault(require("compression"));
const hpp_1 = __importDefault(require("hpp"));
const morgan = require('morgan');
const app = (0, express_1.default)();
const port = server_1.default.PORT;
app.use((0, helmet_1.default)({ xssFilter: true }));
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, compression_1.default)());
app.use((0, hpp_1.default)());
app.use(morgan('dev'));
app.use(rateLimiter_1.rateLimiter);
app.use(errorHandler_1.default);
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: server_1.default.ORIGIN, credentials: true, preflightContinue: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_config_1.connectToMongoDB)();
exports.server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const io = (0, socketConfig_1.createSocketIoServer)(exports.server);
(0, routes_1.default)(app);
app.get('/test', (req, res) => {
    res.send('This is a test message!');
});
app.use("*", (req, res) => {
    res.status(404).send('Page not found');
});
