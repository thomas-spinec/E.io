// import de la config de manière typescript
import instance from "./config";

interface UserRegister {
  username: string;
  email: string;
  password: string;
}

interface UserLogin {
  username: string;
  password: string;
}

export const userActions = {
  // register
  async register(user: UserRegister) {
    try {
      const response = await instance.post("/register", user);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  // login
  async login(user: UserLogin) {
    try {
      const response = await instance.post("/loginApi", user);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  // logout
  async logout() {
    const response = await instance.post("/logout");
    return response;
  },
};
