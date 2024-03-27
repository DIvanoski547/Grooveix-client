import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  getUsers = () => {
    return this.api.get("/users");
  };

  // addUser = (requestBody) => {
  //   return this.api.post("/users", requestBody);
  // };

  getProfile = () => {
    return this.api.get("/profile");
  };

  viewUser = () => {
    return this.api.get("/users/:userId");
  };
}

// Create one instance (object) of the service
const userService = new UserService();

export default userService;
