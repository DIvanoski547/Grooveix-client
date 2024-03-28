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

  //upload file route
  uploadAlbumImage = (file) => {
    return this.api
      .post("/albums/image-upload", file)
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  };
  // POST /albums
  createAlbum = (requestBody) => {
    return this.api.post("/albums", requestBody);
  };

  // GET /albums
  getAllAlbums = () => {
    return this.api.get("/albums");
  };

  // GET /albums/:id
  getAlbum = (albumId) => {
    return this.api.get(`/albums/${albumId}`);
  };

  // PUT /albums/:id
  updateAlbum = (albumId, requestBody) => {
    return this.api.put(`/albums/${albumId}`, requestBody);
  };

  // DELETE /albums/:id
  deleteAlbum = (albumId) => {
    return this.api.delete(`/albums/${albumId}`);
  };
}

// Create one instance object
const albumsService = new AlbumsService();

export default albumsService;
