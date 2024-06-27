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
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // handleLogin
  const handleLogin = async (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  //handleLogout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return useMemo(
    () => (
      <UserContext.Provider
        value={{ user, setUser, handleLogin, handleLogout }}
      >
        {children}
      </UserContext.Provider>
    ),
    [user]
  );
};

export default UserProvider;
