import React, { useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { UserContext } from "../context/userContext";
import MessageComponent from "./MessageComponent";

interface ChatComponentProps {
  pseudo: string | undefined;
  socket: Socket;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ socket }) => {
  const { isConnected, user } = useContext(UserContext);
  const [messages, setMessages] = useState<
    { author: string; content: string }[]
  >([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.on("message", onReceiveMessage);
    return () => {
      socket.off("message", onReceiveMessage);
    };
  }, []);

  const onReceiveMessage = (message: {
    author: string;
    content: string;
  }): void => {
    setMessages((messages) => [...messages, message]);
  };

  const onSendMessage = (message: string): void => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <div className="flex flex-col justify-around w-3/4 m-auto h-screen">
        <div className="flex flex-col justify-end h-5/6 overflow-scroll border-2 border-black">
          {messages.map((message, index) => (
            <MessageComponent key={index} message={message} pseudo={pseudo} />
          ))}
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Rentrer un message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => onSendMessage(message)}>Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
