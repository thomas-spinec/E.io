import { createContext, useEffect, useMemo, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;

}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
  isConnected: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  isConnected: false,
});

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
 const [isConnected, setIsConnected] = useState<boolean>(false);
  // handleLogin
  const handleLogin = async (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setIsConnected(true);
  };

  //handleLogout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsConnected(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      setIsConnected(true);
    }
  }, []);

  return useMemo(
    () => (
      <UserContext.Provider
        value={{ user, setUser, handleLogin, handleLogout, isConnected }}
      >
        {children}
      </UserContext.Provider>
    ),
    [user]
  );
};

export default UserProvider;
