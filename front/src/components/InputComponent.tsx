import React from "react";

function InputComponent({ pseudo, setPseudo, setIsPseudo }) {
  return (
    <div>
      <h1>Entrez votre pseudo</h1>
      <input
        type="text"
        placeholder="Rentrer un pseudo"
        onChange={(e) => setPseudo(e.target.value)}
      />
      <button onClick={() => setIsPseudo(true)}>S'inscrire</button>
    </div>
  );
}

export default InputComponent;
