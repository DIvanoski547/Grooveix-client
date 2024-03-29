import { useEffect, useState } from "react";
import albumsService from "../services/albums.service";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AlbumsListPage() {
  const [albums, setAlbums] = useState([]);

  const getAllAlbums = () => {
    albumsService
      .getAllAlbums()
      .then((response) => setAlbums(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllAlbums();
  }, []);

  return (
    <>
      <Navbar />
      <h3>Album list:</h3>

      {albums.map((album) => (
        <div className="card-wrapper" key={album._id}>
          <Link to={`/albums/${album._id}`}>
            <div className="album-card">
              <img src={album.albumImage} alt={album.albumName} />{" "}
              <h2>{album.albumName}</h2>
            </div>
          </Link>
        </div>
      ))}

      <Link to="/albums/create-album">
        <button className="btn-magenta m-3">Create New Album</button>
      </Link>

      <br />

      <Link to="/profile">
        <button className="btn-magenta m-3">Back </button>
      </Link>
      <Footer />
    </>
  );
}

export default AlbumsListPage;
