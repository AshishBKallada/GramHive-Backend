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
exports.createSocketIoServer = void 0;
const socket_io_1 = require("socket.io");
const user_1 = __importDefault(require("../data/data-sources/mongodb/models/user"));
const followers_1 = __importDefault(require("../data/data-sources/mongodb/models/followers"));
require('colors');
const createSocketIoServer = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        pingTimeout: 60000,
        cors: {
            origin: 'http://localhost:5173',
        },
    });
    io.on('connection', (socket) => {
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
            console.log('new message received', newMessageReceived);
            var chat = newMessageReceived.chat;
            if (!chat.users)
                return console.log('chat users undefined');
            chat.users.forEach((user) => {
                if (user._id === newMessageReceived.sender._id)
                    return;
                socket.in(user._id).emit('message received', newMessageReceived);
                socket.in(user._id).emit('notification received', {
                    senderId: newMessageReceived.sender._id,
                    isRead: false,
                    date: new Date(),
                });
                // socket.in(user._id).emit('notification',{data:'huhuh'});
            });
        });
        socket.on('userStartLive', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId, roomID } = data;
            try {
                const streaminguser = yield user_1.default.findById(userId);
                const followers = yield followers_1.default.find({ follower_id: userId });
                const followerIds = followers.map((follower) => follower.followed_id.toString());
                const liveStreamData = {
                    streaminguser,
                    roomID,
                };
                followerIds.forEach((followerId) => {
                    socket.in(followerId).emit('liveStreamStarted', {
                        liveStreamData
                    });
                });
            }
            catch (error) {
                console.error('Error fetching followers or broadcasting event:', error);
            }
        }));
        socket.on('sentNotification', (notification) => {
            console.log('Notification', notification);
            const userId = notification === null || notification === void 0 ? void 0 : notification.userId;
            socket.in(userId).emit('abcd', { notification });
            console.log('UserID', userId);
        });
    });
    return io;
};
exports.createSocketIoServer = createSocketIoServer;
