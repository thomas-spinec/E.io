import cors from "cors";
import "dotenv/config";
import express from "express";
import { Server } from "socket.io";
import { createServer } from 'http';
import ConnectionLogger from './connectionLogger';


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());


const EXPRESS = process.env.EXPRESS_PORT;
const SOCKET = Number(process.env.SOCKET_PORT);

app.listen(EXPRESS, () => {
  console.log(`Server is running on port ${EXPRESS}`);
});

const io = new Server(SOCKET, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.emit("message", "Hello World");

  socket.on("response", (data) => {
    console.log(data);
  });
  socket.onAny((event, ...args) => {
    console.log("EVENT, ARG", event, args);

    console.log("SOCKET.AUTH", socket.handshake.auth);
  });
});
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

