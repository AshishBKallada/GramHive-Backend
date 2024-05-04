"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const socketIO = require('socket.io');
function initializeSocket(server) {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    });
    io.on('connection', (socket) => {
        console.log(`${socket.id} user just connected!`);
        socket.on('message', (data) => {
            console.log("Received message:", data);
            io.emit('messageResponse', data);
        });
        socket.on('newUser', (data) => {
            console.log("New user joined:", data);
            io.emit('newUserResponse', data);
        });
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
    return io;
}
exports.initializeSocket = initializeSocket;
