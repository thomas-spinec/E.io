import { Server, Socket } from 'socket.io';

class ConnectionLogger {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    public initialize(): void {
        this.io.on('connection', (socket: Socket) => {
            console.log(`New connection: ${socket.id}`);

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
        });
    }
}

export default ConnectionLogger;
