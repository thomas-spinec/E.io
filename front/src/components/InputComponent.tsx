import { Socket } from "socket.io-client";
import { userActions } from "../services/userServices";

interface InputComponentProps {
  pseudo: string;
  setPseudo: (pseudo: string) => void;
  setIsPseudo: (isPseudo: boolean) => void;
  socket: Socket;
}

const InputComponent: React.FC<InputComponentProps> = ({
  pseudo,
  setPseudo,
  setIsPseudo,
  socket,
}) => {
  const onUserSelection = (data: string): void => {
    setIsPseudo(true);

    socket.auth = { pseudo: data };
    socket.connect();
    socket.emit("test", "test");
  };

  return (
    <div>
      <h1>Entrez votre pseudo</h1>
      <input
        type="text"
        placeholder="Rentrer un pseudo"
        onChange={(e) => setPseudo(e.target.value)}
      />
      <button onClick={() => onUserSelection(pseudo)}>S'inscrire</button>
    </div>
  );
};

export default InputComponent;
