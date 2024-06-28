import { io } from "socket.io-client";

const URL = "http://localhost:3000";
const socketenv = io(URL);

export default socketenv;