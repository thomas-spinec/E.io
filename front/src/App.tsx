import { useState } from "react";
import "./App.css";
import InputComponent from "./components/InputComponent";

import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [isPseudo, setIsPseudo] = useState(false);
  const [pseudo, setPseudo] = useState("");
  socket.on("message", (data) => {
    console.log(data);
  });

  socket.emit("response", "Hello");

  return (
    <>
      {isPseudo ? (
        <h1>Bienvenue {pseudo}</h1>
      ) : (
        <InputComponent
          pseudo={pseudo}
          setPseudo={setPseudo}
          setIsPseudo={setIsPseudo}
        />
      )}
    </>
  );
}

export default App;
