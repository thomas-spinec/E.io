import LoginComponent from "../components/Authentification/LoginComponent";
import RegisterComponent from "../components/Authentification/RegisterComponent";
import { useState } from "react";

function Authentification() {
 const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div>
      {isLogin ? (
      <LoginComponent
        setIsLogin={setIsLogin}
      />
      ) : (
      <RegisterComponent 
        setIsLogin={setIsLogin}
      />
      )}
    </div>
  );
}

export default Authentification;
