import axios from "axios";

class ReviewsService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || import.meta.env.LOCAL_SERVER_URL,
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
    return this.api.get(`/reviews/${id}`);
  };

  // POST /reviews -  Posts a review on a specific album by id
  addReview = (requestBody) => {
    return this.api.post("/reviews", requestBody);
  };

  // PUT  /reviews/:reviewId -  Updates a specific review by id
  updateReview = (id, requestBody) => {
    return this.api.put(`/reviews/${id}`, requestBody);
  };

  // DELETE /reviews /:reviewId - Deletes a specific review by id
  deleteReview = (id) => {
    return this.api.delete(`/reviews/${id}`);
  };

}

const reviewsService = new ReviewsService();

export default reviewsService;