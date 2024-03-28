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
  };


  uploadProfileImage = (file) => {
    return this.api.post("/users/profile/image-upload", file)
    .then(res => res.data)
    .catch(err => { throw err });
  }

  getUsers = () => {
    return this.api.get("/users")
    .then(res => res.data)
    .catch(err => { throw err });
  };

  // addUser = (requestBody) => {
  //   return this.api.post("/users", requestBody);
  // };

  getProfile = () => {
    return this.api.get("/users/profile")
    .then(res => res.data)
    .catch(err => { throw err });
  };

  updateProfile = (updatedUser) => {
    return this.api.post("/users/profile", updatedUser)
    .then(res => res.data)
    .catch(err => { throw err });
  }

  viewUser = (id) => {
    return this.api.get(`/users/${id}`)
    .then(res => res.data)
    .catch(err => { throw err });
  };
}

// Create one instance (object) of the service
const userService = new UserService();

export default userService;
