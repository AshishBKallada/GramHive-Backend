import express from 'express';
import { connectToMongoDB } from './data/interfaces/data-sources/db-config';
import routes from './frameworks/routes';
import config from './config/server';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { Socket } from 'socket.io';
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

const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin: 'http://localhost:5173',
    }
})

io.on('connection',(socket:Socket)=>{

    console.log('Connection established to socket.io'.cyan,socket);

    socket.on('setup',(userId)=>{
        socket.join(userId);
        console.log('User connected'.blue,userId);
        socket.emit('connected');
    })

    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log('User joined rooom'.red,room);
    })

    socket.on('typing',(room)=>{
        socket.in(room).emit('typing');
    })

    socket.on('stop typing',(room)=>{
        socket.in(room).emit('stop typing');
    })
    
    socket.on('new message',(newMessageReceived)=>{

        var chat = newMessageReceived.chat;
        if(!chat.users) return console.log('chat users undefined');

        chat.users.forEach((user)=>{
            if(user._id === newMessageReceived.sender._id) return;
            socket.in(user._id).emit('message received',newMessageReceived);
        });
    })
});


routes(app)

