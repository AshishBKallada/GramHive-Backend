"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./data/interfaces/data-sources/db-config");
const routes_1 = __importDefault(require("./frameworks/routes"));
const server_1 = __importDefault(require("./config/server"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require('colors');
const app = (0, express_1.default)();
const port = server_1.default.PORT;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: server_1.default.ORIGIN, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_config_1.connectToMongoDB)();
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:5173',
    }
});
io.on('connection', (socket) => {
    console.log('Connection established to socket.io'.cyan, socket);
    socket.on('setup', (userId) => {
        socket.join(userId);
        console.log('User connected'.blue, userId);
        socket.emit('connected');
    });
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined rooom'.red, room);
    });
    socket.on('typing', (room) => {
        socket.in(room).emit('typing');
    });
    socket.on('stop typing', (room) => {
        socket.in(room).emit('stop typing');
    });
    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        if (!chat.users)
            return console.log('chat users undefined');
        chat.users.forEach((user) => {
            if (user._id === newMessageReceived.sender._id)
                return;
            socket.in(user._id).emit('message received', newMessageReceived);
        });
    });
});
(0, routes_1.default)(app);
