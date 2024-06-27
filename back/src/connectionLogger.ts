import { Server, Socket } from 'socket.io';

class ConnectionLogger {
    private io: Server;
    private users: { [id: string]: { id: string, auth: any } };

    constructor(io: Server) {
        this.io = io;
        this.users = {};
    }

    public initialize(): void {
        this.io.on('connection', (socket: Socket) => {
            console.log(`New connection: ${socket.handshake.auth.pseudo} (${socket.id})`);
            for(let [id, socket] of this.io.of("/").sockets) {
                this.users[id] = { id, auth: socket.handshake.auth };
            }
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
                const senderId = socket.id;
                console.log(`Private message from ${senderId} to ${recipientId}: ${message}`);

                // Send the private message to the recipient
                this.io.to(recipientId).emit('privateMessage', senderId, message);
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
                console.log(this.users)
                console.log(`Message from ${this.users[socket.id].auth.pseudo}: ${message}`);
                this.io.emit("message", `${this.users[socket.id].auth.pseudo}: ${message}`);
            });

            socket.on("disconnect", () => {
                this.io.emit("message", `User ${this.users[socket.id].auth.pseudo} disconnected`);
                this.users = Object.fromEntries(
                    Object.entries(this.users).filter(([id, user]) => id !== socket.id)
                );
                this.io.emit("users", this.users);
            });
        });
    }
}

export default ConnectionLogger;
