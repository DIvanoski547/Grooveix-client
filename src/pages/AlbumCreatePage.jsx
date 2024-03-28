import { useState } from "react";
import albumsService from "../services/albums.service";
import { Link } from "react-router-dom";

function AlbumCreatePage() {
  const [albumImage, setAlbumImage] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [artistsNames, setArtistsNames] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isUploadingAlbumImage, setIsUploadingAlbumImage] = useState(false);

  //handle file upload for albumImage
  const handleFileUpload = async (element) => {
    console.log("The file to be uploaded is:", element.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("albumImage", element.target.files[0]);

    try {
      setIsUploadingAlbumImage(true);
      const response = await albumsService.uploadAlbumImage(uploadData);
      console.log("response", response)
      setAlbumImage(response.albumImage);
      setIsUploadingAlbumImage(false);
    } catch (err) {
      console.log("Error occured while uploading album image", err);
    }
  };

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
        <label htmlFor="albumImage">Album Image:</label>
        <input
          type="file"
          name="albumImage"
          onChange={(e) => handleFileUpload(e)}
        />
        <br />
        <label>Album Name:</label>
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
        {!isUploadingAlbumImage ? <button type="submit">Add Album</button> : <button type="submit" disabled>Uploading album image...</button>}
      </form>
      <Link to="/albums">
        <button>Back</button>
      </Link>
    </>
  );
}
export default AlbumCreatePage;
