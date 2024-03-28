import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import albumsService from "../services/albums.service";

function AlbumEditPage() {
  const [albumImage, setAlbumImage] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [artistsNames, setArtistsNames] = useState("");
  const [isUploadingAlbumImage, setIsUploadingAlbumImage] = useState(false);

  const { albumId } = useParams();
  const navigate = useNavigate();

  //handle file upload for albumImage
  const handleFileUpload = async (element) => {
    console.log("The file to be uploaded is:", element.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("albumImage", element.target.files[0]);

    try {
      setIsUploadingAlbumImage(true);
      const response = await albumsService.uploadAlbumImage(uploadData);
      console.log("response", response);
      setAlbumImage(response.albumImage);
      setIsUploadingAlbumImage(false);
    } catch (err) {
      console.log("Error occured while uploading album image", err);
    }
  };

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
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const requestBody = { albumImage, albumName, artistsNames };

    albumsService.updateAlbum(albumId, requestBody).then(() => {
      navigate(`/albums/${albumId}`);
    });
  };

  //function to delete an album
  const deleteAlbum = () => {
    albumsService
      .deleteAlbum(albumId)
      .then(() => {
        console.log(`album with ID ${albumId} was deleted`);
        navigate("/albums");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Album edit page:</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="albumImage">Album Image:</label><br/>
        <img src={albumImage} alt="album_img" width={300} height={300} /><br/>
        <input
          type="file"
          name="albumImage"
          onChange={(e) => handleFileUpload(e)}
        />
        <br />
        <label>AlbumName:</label><br/>
        <input
          type="text"
          name="albumName"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
        <br />
        <label>Artists Names:</label><br/>
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
