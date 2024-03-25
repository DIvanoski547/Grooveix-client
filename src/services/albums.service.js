import axios from "axios";

class AlbumsService {
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

  // POST /api/album
  createAlbum = (requestBody) => {
    return this.api.post("/api/albums", requestBody);
  };

  // GET /api/albums
  getAllAlbums = () => {
    return this.api.get("/api/albums");
  };

  // GET /api/albums/:id
  getAlbum = (albumId) => {
    return this.api.get(`/api/albums/${albumId}`);
  };

  // PUT /api/albums/:id
  updateAlbum = (albumId, requestBody) => {
    return this.api.put(`/api/albums/${albumId}`, requestBody);
  };

  // DELETE /api/albums/:id
  deleteAlbum = (albumId) => {
    return this.api.delete(`/api/albums/${albumId}`);
  };
}

// Create one instance object
const albumsService = new AlbumsService();

export default albumsService;
