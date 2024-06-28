import { Server, Socket } from 'socket.io';

class ConnectionLogger {
    private io: Server;
    private users: { 
        [id: string]: {
            socketId: string;
            username: string;
        }
    };

    constructor(io: Server) {
        this.io = io;
        this.users = {};
    }

    public initialize(): void {
        this.io.use((socket, next) => {
            const auth = socket.handshake.auth;
            console.log("AUTH", auth);
            if (!auth) {
                return next(new Error("Authentification failed"));
            }

            return next();
        });
        this.io.on('connection', (socket: Socket) => {

            this.users[socket.handshake.auth.id] = {
                socketId: socket.id,
                username: socket.handshake.auth.username,
                // Any other user details you want to track
            };

            console.log(this.users)
            socket.broadcast.emit("message", {
                content: `${this.users[socket.handshake.auth.id].username} s'est connecté`});
            this.io.emit("users", this.users);

            socket.on('joinGroup', (groupId: string) => {
                socket.join(groupId);
                console.log(`Socket ${socket.id} joined group ${groupId}`);
            });

            socket.on('leaveGroup', (groupId: string) => {
                socket.leave(groupId);
                console.log(`Socket ${socket.id} left group ${groupId}`);
            });

            socket.on('privateMessage', (recipientId: string, message: string) => {
                const senderId = this.users[socket.handshake.auth.id].socketId;
                console.log(`Private message from ${senderId} to ${recipientId}: ${message}`);

                // Send the private message to the recipient
                socket.to(recipientId).emit('privateMessage', {
                    content: message,
                    from: senderId,
                    to: recipientId,
                });
            });

            socket.on('groupMessage', (groupId: string, message: string) => {
                const senderId = socket.id;
                console.log(`Group message from ${senderId} in group ${groupId}: ${message}`);
            
                // Send the group message to all members of the group
                this.io.to(groupId).emit('groupMessage', senderId, message);
            });

            socket.onAny((event, ...args) => {
                console.log("EVENT, ARG", event, args);
                console.log("SOCKET.AUTH", socket.handshake.auth);
            });

            socket.on("response", (data) => {
                console.log(data);
            });

            socket.on("message", (message) => {
                console.log(socket.handshake.auth);
                this.io.emit("message", {
                    author: this.users[socket.handshake.auth.id].username,
                    content: message
                });
            });

            socket.on("disconnect", () => {
                socket.broadcast.emit("message", {
                    content: `${this.users[socket.handshake.auth.id]?.username} s'est déconnecté`});
                delete this.users[socket.handshake.auth.id];
                this.io.emit("users", this.users);
            });
        });
    }
}

export default ConnectionLogger;
