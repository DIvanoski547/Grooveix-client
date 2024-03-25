import { useEffect, useState } from "react";
import albumsService from "../services/albums.service";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

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
       <div className="album_card">
         <div key={album._id}>
          <p>{album.albumImage}</p>

          <Link to={`/albums/${album._id}`}>
            <h2>{album.albumName}</h2>
          </Link>
        </div>
       </div>
      ))}

      <button>
        <Link to="/albums/create-album">Create New Album</Link>
      </button>
      <br />
      <button>
        <Link to="/profile">Back</Link>
      </button>
    </>
  );
}

export default AlbumsListPage;
