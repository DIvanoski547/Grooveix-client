import axios from "axios";

class ReviewsService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });
    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // interceptor will execute before request is sent
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }


  // GET /reviews/:reviewId -  Retrieves a specific review by id
  getReview = (id) => {
    return this.api.get(`/api/reviews/${id}`);
  };

  // POST /reviews -  Posts a review on a specific album by id
  createReview = (requestBody) => {
    return this.api.post("/api/reviews", requestBody);
  };

  // PUT  /reviews/:reviewId -  Updates a specific review by id
  updateReview = (id, requestBody) => {
    return this.api.put(`/api/reviews/${id}`, requestBody);
  };

  // DELETE /reviews /:reviewId - Deletes a specific review by id
  deleteReview = (id) => {
    return this.api.delete(`/api/reviews/${id}`);
  };

}

const reviewsService = new ReviewsService();

export default reviewsService;