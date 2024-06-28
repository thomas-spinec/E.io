import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import ChatComponent from "../components/ChatComponent";
import HomeComponent from "../components/HomeComponent";
import { UserContext } from "../context/userContext";

const socket = io("http://localhost:3000", { autoConnect: false });
function HomePage() {
  const { isConnected, user } = useContext(UserContext);



  /* socket.on("users", (users) => {
    console.log(users);
  }); */

 
  return (
    <>
      {isConnected ? (
        <>
          <h1>Bienvenue {user?.username}</h1>
          <ChatComponent pseudo={user?.username} socket={socket} />
        </>
      ) : (
        <HomeComponent />
      )}
    </>
  );
}

export default HomePage;
