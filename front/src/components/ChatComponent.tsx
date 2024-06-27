import React from 'react'
import { useEffect, useState } from 'react';
import { Socket } from "socket.io-client";

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
        <div>
            {messages.map((message, index) => (
                <div
                    key={index}
                >
                    {message.author === pseudo ? (
                        <p
                            style={{ textAlign: "right" }}>
                             {message.content}
                        </p>
                    ) : (
                        <p style={{ textAlign: "left" }}>
                            {message.author}: {message.content}
                        </p>
                    )}
                </div>
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