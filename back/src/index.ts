import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import { createServer } from 'http';
import ConnectionLogger from './connectionLogger';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    } 
));
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const connectionLogger = new ConnectionLogger(io);
connectionLogger.initialize();

const PORT = process.env.SERVER_PORT

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});