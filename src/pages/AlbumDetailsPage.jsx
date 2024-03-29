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
        <div className="wrap pb-3">
          {album && (
            <div className="pt-5">
              <h3>Album details</h3>
              <img
                src={album.albumImage}
                alt="album_img"
                width={300}
                height={300}
              />
              <h4>{album.albumName}</h4>
              <p>{album.artistsNames}</p>

              <h3>Album's Reviews</h3>
              <div className="card">
                <AddReview reloadAlbum={getAlbum} albumId={albumId} />
                <ul>
                  <li>
                    {album &&
                      album.reviews.map((review) => (
                        <ReviewCard key={review._id} {...review} />
                      ))}
                  </li>
                </ul>
              </div>

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
        </div>
      </div>
    </>
  );
}

export default AlbumDetailPage;
