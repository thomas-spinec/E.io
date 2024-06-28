import { createContext, useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";

interface User {
  id: number;
  username: string;
}

interface SocketContextProps {
  socket: Socket;
  socketConnection: (username: User["username"], id: User["id"]) => void;
  socketDeconnection?: () => void;
  socketSendMessage?: (message: string) => void;
  usersList: { 
    [id: string]: {
        socketId: string;
        username: string;
    }
  },
}

export const SocketContext = createContext<SocketContextProps>({
  socket: io("http://localhost:3000", { autoConnect: false }),
  socketConnection: () => {},
  socketDeconnection: () => {},
  socketSendMessage: () => {},
  usersList: {},
});

export const SocketProvider: React.FC = ({ children }) => {
  const socket = io("http://localhost:3000", { autoConnect: false });
  const [usersList, setUsersList] = useState<{ 
    [id: string]: {
        socketId: string;
        username: string;
    }
  }>({});

  const socketConnection = (
    username: User["username"],
    id: User["id"]
  ): void => {
    socket.auth = {
      username,
      id,
    };
    socket.connect();
  };

  const socketDeconnection = (): void => {
    socket.disconnect();
  };

  const socketSendMessage = (message: string): void => {
    console.log(message);
    socket.emit("message", message);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log('user')
      const user = JSON.parse(localStorage.getItem("user") || "");
      socketConnection(user.username, user.id);
    }
  } , [])

  useEffect(() => {
    socket.on("users", (users) => {
      setUsersList(users);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(socket);
  } , [socket])

  return useMemo(
    () => (
      <SocketContext.Provider
        value={{ socket, socketConnection, socketDeconnection, socketSendMessage, usersList }}
      >
        {children}
      </SocketContext.Provider>
    ),
    [socket]
  );
};
