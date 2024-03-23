import axios from "axios";

class AuthService {
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

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/login");
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };

  verify = () => {
    return this.api.get("/auth/verify");
    // same as
    // return axios.post("http://localhost:5005/auth/verify");
  };

  // verifyToken = (storedToken) => {
  //   return this.api
  //     .get("/auth/verify", {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     })
  //     .then((response) => response.data)
  //     .catch((err) => console.error(err));
  // };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
