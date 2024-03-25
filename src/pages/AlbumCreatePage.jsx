import { useState } from "react";
import albumsService from "../services/albums.service";
import { Link } from "react-router-dom";

function AlbumCreatePage() {
  const [albumImage, setAlbumImage] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [artistsNames, setArtistsNames] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { albumImage, albumName, artistsNames };
    albumsService
      .createAlbum(requestBody)
      .then(() => {
        setAlbumImage("");
        setAlbumName("");
        setArtistsNames("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h2>Create new albums</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="albumImage"
          value={albumImage}
          onChange={(e) => setAlbumImage(e.target.value)}
        />
        <br />
        <label>AlbumName:</label>
        <input
          type="text"
          name="albumName"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
        <br />
        <label>Artists Names:</label>
        <input
          type="text"
          name="artistsNames"
          value={artistsNames}
          onChange={(e) => setArtistsNames(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <Link to="/albums">
        <button>Back</button>
      </Link>
    </>
  );
}
export default AlbumCreatePage;
