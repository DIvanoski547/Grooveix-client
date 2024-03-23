import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import albumsService from "../services/albums.service";

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
  }, []);

  return (
    <>
      {album && (
        <>
          <p>{album.albumImage}</p>
          <h1>{album.albumName}</h1>
          <p>{album.artistsNames}</p>
          <h2>Reviews</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review._id}>
                {/* Assuming review structure matches the Mongoose schema */}
                <p>Username: {review.username}</p>
                <p>Rating: {review.rating}</p>
                <p>Content: {review.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
export default AlbumDetailPage;
