import React from 'react'
import { useEffect, useState } from 'react';
import { Socket } from "socket.io-client";
import MessageComponent from './MessageComponent';

interface ChatComponentProps {
  pseudo: string;
  socket: Socket;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ pseudo, socket }) => {

    const [messages, setMessages] = useState<{ author: string; content: string }[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        socket.on("message", onReceiveMessage);
        return () => {
            socket.off("message", onReceiveMessage);
        };
    }, []);

    const onReceiveMessage = (message: {author: string; content: string}): void => {
        setMessages((messages) => [...messages, message]);
    };

    const onSendMessage = (message: string): void => {
        socket.emit("message", message);
        setMessage("");
    };

  return (
    <div>
        <div className='flex flex-col w-3/4 m-auto'>
            <div>
                {messages.map((message, index) => (
                    <MessageComponent
                        key={index}
                        message={message}
                        pseudo={pseudo}
                    />
                ))}
            </div>
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