import { createContext, useEffect, useMemo } from "react";
import { Socket, io } from "socket.io-client";

interface User {
  id: number;
  username: string;
}

interface SocketContextProps {
  socket: Socket;
  socketConnection: (username: User["username"], id: User["id"]) => void;
  socketDeconnection?: () => void;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: io("http://localhost:3000", { autoConnect: false }),
  socketConnection: () => {},
  socketDeconnection: () => {},
});

export const SocketProvider: React.FC = ({ children }) => {
  const socket = io("http://localhost:3000", { autoConnect: false });

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

  useEffect(() => {
    socket.on("users", (users) => {
      console.log(users);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return useMemo(
    () => (
      <SocketContext.Provider
        value={{ socket, socketConnection, socketDeconnection }}
      >
        {children}
      </SocketContext.Provider>
    ),
    [socket]
  );
};
