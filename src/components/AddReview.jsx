import { useState } from "react";
import reviewsService from "../services/reviews.service";

function AddReview({ albumId, reloadAlbum }) {
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // the username will be retrieved from payload on the server
    const requestBody = { albumId, rating, content };

    reviewsService
      .addReview(requestBody)
      .then(() => {
        // Reset the state to clear the inputs
        setRating("");
        setContent("");
        reloadAlbum();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Add Review</h3>

      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="form-control border-dark-subtle mb-2"
        />
        <label>Comment:</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control border-dark-subtle mb-2 "
          rows="3"
        />

        <button type="submit" className="btn-add">Submit</button>
      </form>
    </div>
  );
}

export default AddReview;
