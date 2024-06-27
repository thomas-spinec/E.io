import { useState } from "react";
import { io } from "socket.io-client";
import InputComponent from "../components/InputComponent";

const socket = io("http://localhost:3000", { autoConnect: false });
function HomePage() {
  const [isPseudo, setIsPseudo] = useState<boolean>(false);
  const [pseudo, setPseudo] = useState<string>("");

  socket.on("users", (users) => {
    console.log(users);
  });
  return (
    <>
      {isPseudo ? (
        <h1>Bienvenue {pseudo}</h1>
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

export default HomePage;
