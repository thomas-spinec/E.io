import React from 'react'
import { useEffect, useState } from 'react';
import { Socket } from "socket.io-client";

interface ChatComponentProps {
  pseudo: string;
  socket: Socket;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ pseudo, socket }) => {

    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        socket.on("message", onReceiveMessage);
        return () => {
            socket.off("message", onReceiveMessage);
        };
    }, []);

    const onReceiveMessage = (message: string): void => {
        setMessages((messages) => [...messages, message]);
    };

    const onSendMessage = (message: string): void => {
        socket.emit("message", message);
    };

  return (
    <div>
        <div>
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
            <input 
                type="text"
                placeholder="Rentrer un message"
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                onClick={() => onSendMessage(message)}
            >
                Envoyer
            </button>
        </div>
    </div>
  );
};

export default ChatComponent;