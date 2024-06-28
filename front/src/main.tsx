import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SocketProvider } from "./context/socketContext.tsx";
import UserProvider from "./context/userContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SocketProvider>
  </React.StrictMode>
);
