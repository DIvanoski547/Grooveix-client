import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import albumsService from "../services/albums.service";
import Navbar from "../components/Navbar";

function AlbumDetailPage() {
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
      {album && (
        <>
          <p>{album.albumImage}</p>
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
      <Link to="/albums">
        <button>Back to albums</button>
      </Link>
      <Link to={`/albums/edit/${albumId}`}>
        <button>Edit</button>
      </Link>
    </>
  );
}
export default AlbumDetailPage;
