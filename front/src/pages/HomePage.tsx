import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import ChatComponent from "../components/ChatComponent";
import HomeComponent from "../components/HomeComponent";
import { UserContext } from "../context/userContext";
import { SocketContext } from "../context/socketContext";


function HomePage() {

  const { isConnected, user } = useContext(UserContext);
 
  return (
    <>
      {isConnected ? (
        <>
          <h1>Bienvenue {user?.username}</h1>
          <ChatComponent />
        </>
      ) : (
        <HomeComponent />
      )}
    </>
  );
}

export default HomePage;
