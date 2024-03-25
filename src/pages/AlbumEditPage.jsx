import { Link, useNavigate, useParams } from "react-router-dom";
import albumsService from "../services/albums.service";
import { useEffect, useState } from "react";

function AlbumEditPage() {
  const [albumImage, setAlbumImage] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [artistsNames, setArtistsNames] = useState([""]);

  const { albumId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    albumsService
      .getAlbum(albumId)
      .then((response) => {
        const oneAlbum = response.data;
        setAlbumImage(oneAlbum.albumImage);
        setAlbumName(oneAlbum.albumName);
        setArtistsNames(oneAlbum.artistsNames);
      })
      .catch((error) => console.log(error));
  }, [albumId]);
  // Function to handle submit and update
  const handlesubmitForm = (e) => {
    e.preventdefault();
    const requestBody = { albumImage, albumName, artistsNames };

    albumsService.updateAlbum(albumId, requestBody).then(() => {
      navigate(`/albums/${albumId}`);
    });
  };

  //function to delete an album
  const deleteAlbum = () => {
    albumsService
      .deleteAlbums(albumId)
      .then(() => {
        console.log(`album with ID ${albumId} was deleted`)
        navigate("/albums");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Album edit page:</h1>
      <form onSubmit={handlesubmitForm}>
        <label>AlbumName:</label>
        <input
          type="text"
          name="albumName"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
        <br />
        <label>Artistst Names:</label>
        <input
          type="text"
          name="artistsNames"
          value={artistsNames}
          onChange={(e) => setArtistsNames(e.target.value)}
        />
        <br />
        <button type="submit">Update Album</button>
      </form>
      <button onClick={deleteAlbum}>Delete Album</button>
      <button>
        <Link to={`/albums/${albumId}`}>Back</Link>
      </button>
    </>
  );
}

export default AlbumEditPage;
