import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    } 
));
app.use(express.json());

const EXPRESS = process.env.EXPRESS_PORT
const SOCKET = Number(process.env.SOCKET_PORT)

app.listen(EXPRESS, () => {

    console.log(`Server is running on port ${EXPRESS}`);
});

const io = new Server(SOCKET, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
    socket.emit("message", "Hello World");
  
    socket.on('response', (data) => {
      console.log(data);
    });    
});