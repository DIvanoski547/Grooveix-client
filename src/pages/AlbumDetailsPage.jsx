import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import albumsService from "../services/albums.service";
import Navbar from "../components/Navbar";
import AddReview from "../components/AddReview";
import ReviewCard from "../components/ReviewCard";
import { AuthContext } from "../context/auth.context";
import Footer from "../components/Footer";

function AlbumDetailPage() {
  const { isAdmin } = useContext(AuthContext);
  const [album, setAlbum] = useState(null);
  const { albumId } = useParams();
  const [reviews, setReviews] = useState([]);

  const getAlbum = () => {
    albumsService
      .getAlbum(albumId)
      .then((response) => {
        const oneAlbum = response.data;
        setAlbum(oneAlbum);
        if (oneAlbum && oneAlbum.reviews) {
          setReviews(oneAlbum.reviews);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAlbum();
  }, [albumId]);

  return (
    <>
      <Navbar />
      <div className="wrap-container text-light">
        <div className="wrap">
          {album && (
            <>
              <h1>Album details</h1>
              <img
                src={album.albumImage}
                alt="album_img"
                width={300}
                height={300}
              />
              <h1>{album.albumName}</h1>
              <p>{album.artistsNames}</p>
              <h2>Reviews</h2>
              {reviews.length > 0 ? (
                <ul>
                  {reviews.map((review) => (
                    <li key={review._id}>
                      <p>Username: {review.username}</p>
                      <p>Rating: {review.rating}</p>
                      <p>Content: {review.content}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews available</p>
              )}
            </>
          )}
          <Link to="/homepage">
            <button>Back</button>
          </Link>
          {isAdmin && (
            <Link to={`/albums/edit/${albumId}`}>
              <button className="btn-edit m-2">Edit</button>
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AlbumDetailPage;
