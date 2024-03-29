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
      <div className="wrap-container">
        <div className="wrap">
          {album && (
            <div>
              <h1>Album details</h1>
              <img
                src={album.albumImage}
                alt="album_img"
                width={300}
                height={300}
              />
              <h1>{album.albumName}</h1>
              <p>{album.artistsNames}</p>

              <h2>Album's Reviews</h2>
              <AddReview reloadAlbum={getAlbum} albumId={albumId} />
              <ul>
                <li>
                  {album &&
                    album.reviews.map((review) => (
                      <ReviewCard key={review._id} {...review} />
                    ))}
                </li>
              </ul>

              <Link to="/homepage">
                <button className="btn-back m-2">Back</button>
              </Link>

              {isAdmin && (
                <>
                  <Link to={`/albums/edit/${albumId}`}>
                    <button className="btn-edit m-2">Edit</button>
                  </Link>
                </>
              )}
            </div>
          )}
          ;
        </div>
      </div>
    </>
  );
}

export default AlbumDetailPage;
