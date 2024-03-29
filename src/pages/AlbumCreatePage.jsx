import { useState } from "react";
import albumsService from "../services/albums.service";
import { Link } from "react-router-dom";

function AlbumCreatePage() {
  const [albumImage, setAlbumImage] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [artistsNames, setArtistsNames] = useState("");
  const [isUploadingAlbumImage, setIsUploadingAlbumImage] = useState(false);

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
          <div className="wrap-container">
        <div className="wrap">
          <h2>Create new album</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="albumImage">Album image</label>
            <input
              className="form-control mb-2"
              type="file"
              name="albumImage"
              onChange={(e) => handleFileUpload(e)}
            />

            <label>Album name</label>
            <input
              className="form-control mb-2"
              type="text"
              name="albumName"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />

            <label>Artists names</label>
            <input
              className="form-control mb-2"
              type="text"
              name="artistsNames"
              value={artistsNames}
              onChange={(e) => setArtistsNames(e.target.value)}
            />

            {!isUploadingAlbumImage ? (
              <button type="submit" className="btn-add m-2">
                Add Album
              </button>
            ) : (
              <button type="submit" disabled>
                Uploading album image...
              </button>
            )}
            <Link to="/albums">
              <button className="btn-back m-2">Back</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default AlbumCreatePage;
