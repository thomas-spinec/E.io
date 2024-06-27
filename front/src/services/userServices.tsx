// import de la config de manière typescript
import instance from "./config";

interface User {
  email: string;
  password: string;
  username: string;
}

export const userActions = {
  // register
  async register(user: User) {
    const response = await instance.post("/register", user);

    return response;
  },

  // login
  async login(user: User) {
    const response = await instance.post("/loginApi", user);

    return response;
  },

  // logout
  async logout() {
    const response = await instance.post("/logout");

    return response;
  },
};
