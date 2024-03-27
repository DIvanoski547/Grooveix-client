import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
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


  uploadProfileImage = (image) => {
    return this.api.post("/users/profile/image-upload", image)
  }

  getUsers = () => {
    return this.api.get("/users");
  };

  // addUser = (requestBody) => {
  //   return this.api.post("/users", requestBody);
  // };

  getProfile = () => {
    return this.api.get("/users/profile");
  };

  updateProfile = (requestBody) => {
    return this.api.put("/users/profile", requestBody)
  }

  viewUser = (id) => {
    return this.api.get(`/users/${id}`);
  };
}

// Create one instance (object) of the service
const userService = new UserService();

export default userService;
