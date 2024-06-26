import { Server, Socket } from 'socket.io';
import userModel from '../data/data-sources/mongodb/models/user';
import followModel from '../data/data-sources/mongodb/models/followers';
import { INotification } from '../domain/entities/notifications';
import { User } from '../domain/entities/user';
require('colors');

export const createSocketIoServer = (httpServer: any) => {
    const io = new Server(httpServer, {
        pingTimeout: 60000,
        cors: {
            origin: 'http://localhost:5173',
        },
    });


    io.on('connection', (socket: Socket) => {


        socket.on('setup', (userId: string) => {
            socket.join(userId);
            console.log('User connected', userId);
            socket.emit('connected');
        })

        socket.on('join chat', (room: string) => {
            socket.join(room);
            console.log('User joined rooom', room);
        })

        socket.on('typing', (room: string) => {
            socket.in(room).emit('typing');
        })

        socket.on('stop typing', (room: string) => {
            socket.in(room).emit('stop typing');
        })

        socket.on('new message', (newMessageReceived: any) => {
            console.log('new message received', newMessageReceived);

            var chat = newMessageReceived.chat;
            if (!chat.users) return console.log('chat users undefined');

            chat.users.forEach((user: User) => {
                if (user._id === newMessageReceived.sender._id) return;
                if (user._id) {
                    socket.in(user._id).emit('message received', newMessageReceived);

                    socket.in(user._id).emit('notification received', {
                        senderId: newMessageReceived.sender._id,
                        isRead: false,
                        date: new Date(),
                    })
                }


                // socket.in(user._id).emit('notification',{data:'huhuh'});
            });
        })

        socket.on('userStartLive', async (data: any) => {
            const { userId, roomID } = data;
            try {
                const streaminguser = await userModel.findById(userId)
                const followers = await followModel.find({ follower_id: userId });
                const followerIds = followers.map((follower: any) => follower.followed_id.toString());

                const liveStreamData = {
                    streaminguser,
                    roomID,
                };
                followerIds.forEach((followerId: string) => {
                    socket.in(followerId).emit('liveStreamStarted', {
                        liveStreamData
                    });

                });
            } catch (error) {
                console.error('Error fetching followers or broadcasting event:', error);
            }
        });

        socket.on('sentNotification', (notification: INotification) => {
            console.log('Notification received', notification);
            const userId = notification?.userId;
            socket.in(userId).emit('abcd', { notification });
            console.log('UserID', userId);

        })
    });
    return io;
};