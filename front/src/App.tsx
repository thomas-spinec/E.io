import { useState } from "react";
import "./App.css";
import InputComponent from "./components/InputComponent";

import { io } from "socket.io-client";
import ChatComponent from "./components/ChatComponent";

const socket = io("http://localhost:3000", { autoConnect: false });

function App() {
  const [isPseudo, setIsPseudo] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>("");

  socket.on("users", (users) => {
    console.log(users);
  });

  window.onbeforeunload = () => {
    socket.disconnect();
  };

  return (
    <>
      {isPseudo ? (
        <>
          <h1>Bienvenue {pseudo}</h1>
          <ChatComponent pseudo={pseudo} socket={socket} />
        </>
      ) : (
        <InputComponent
          pseudo={pseudo}
          setPseudo={setPseudo}
          setIsPseudo={setIsPseudo}
          socket={socket}
        />
      )}
    </>
  );
}

export default App;
