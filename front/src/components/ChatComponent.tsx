import React, { useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
/* import { UserContext } from "../context/userContext"; */
import MessageComponent from "./MessageComponent";
import { UserContext } from "../context/userContext";
import { SocketContext } from "../context/socketContext";
import socketenv from "../services/socket";

const ChatComponent = () => {

  /* const { socket, socketSendMessage } = useContext(SocketContext); */
  const { user, isConnected } = useContext(UserContext); 
  let socketRef = useRef(null)
  const [messages, setMessages] = useState<
    { author: string; content: string }[]
  >([]);
  const [users, setUsers] = useState<{ [id: string]: { socketId: string; username: string } }>({});
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (isConnected) {
      socketRef.current = socketenv;
      socketRef.current.auth = {
        username: user?.username,
        id: user?.id,
      };
    }
  }, [isConnected]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("message", onReceiveMessage);
      return () => {
        socketRef.current.off("message", onReceiveMessage);
      };
    }
  } , [socketRef])

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("users", (users) => {
        setUsers(users);
      });
    } 
  }, [socketRef])

  const onReceiveMessage = (message: {
    author: string;
    content: string;
  }): void => {
    console.log(message);
    setMessages((messages) => [...messages, message]);
  };

  const onSendMessage = (): void => {
    socketRef.current.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <div className="flex flex-col justify-around w-3/4 m-auto h-screen">
        <div className="flex flex-col justify-end h-5/6 overflow-scroll border-2 border-black">
          {messages.map((message, index) => (
            <MessageComponent key={index} message={message} />
          ))}
        </div>
        <div className="">
          <input
            type="text"
            value={message}
            placeholder="Rentrer un message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={onSendMessage}>Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
