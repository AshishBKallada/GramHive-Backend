"use strict";

import { Server, Socket } from "socket.io";

Object.defineProperty(exports, "__esModule", { value: true });

exports.initializeSocket = void 0;
require('colors');
const initializeSocket = (server:Server) => {
    const io = require('socket.io')(server, {
        pingTimeout: 60000,
        cors: {
            origin: 'http://localhost:5173',
        }
    });
    io.on('connection', (socket:Socket) => {
        console.log('Connection established to socket.io'.cyan);
        socket.on('setup', (userId) => {
            socket.join(userId);
            console.log('User connected'.blue, userId);
            socket.emit('connected');
        });
        socket.on('join chat', (room) => {
            socket.join(room);
            console.log('User joined room'.red, room);
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
};
exports.initializeSocket = initializeSocket;
