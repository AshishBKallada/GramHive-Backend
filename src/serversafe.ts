import express from 'express';
import { connectToMongoDB } from './data/interfaces/data-sources/db-config';
import routes from './frameworks/routes';
import config from './config/server';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { Socket } from 'socket.io';
import followModel from './data/data-sources/mongodb/models/followers';
import userModel from './data/data-sources/mongodb/models/user';
require('colors');

const app = express();
const port = config.PORT;

app.use(cookieParser());
app.use(cors({ origin: config.ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB();

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:5173',
    }
})

io.on('connection', (socket: Socket) => {


    socket.on('setup', (userId) => {
        socket.join(userId);
        console.log('User connected'.blue, userId);
        socket.emit('connected');
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined rooom'.red, room);
    })

    socket.on('typing', (room) => {
        socket.in(room).emit('typing');
    })

    socket.on('stop typing', (room) => {
        socket.in(room).emit('stop typing');
    })

    socket.on('new message', (newMessageReceived) => {

        var chat = newMessageReceived.chat;
        if (!chat.users) return console.log('chat users undefined');

        chat.users.forEach((user) => {
            if (user._id === newMessageReceived.sender._id) return;
            socket.in(user._id).emit('message received', newMessageReceived);

            socket.in(user._id).emit('notification received', {
                senderId: newMessageReceived.sender._id,
                isRead: false,
                date: new Date(),
            })
        });
    })

    socket.on('userStartLive', async (data: any) => {
        const { userId, roomID } = data;
        console.log('44444444444', userId, roomID);
        try {
            const streaminguser = await userModel.findById(userId)
            const followers = await followModel.find({ follower_id: userId });
            const followerIds = followers.map((follower: any) => follower.followed_id.toString());

            const liveStreamData = {
                streaminguser,
                roomID,
            };
            followerIds.forEach((followerId) => {
                socket.in(followerId).emit('liveStreamStarted', {
                    liveStreamData
                });
            });
        } catch (error) {
            console.error('Error fetching followers or broadcasting event:', error);
        }
    });
});


const io = createSocketIoServer(server);



routes(app)

