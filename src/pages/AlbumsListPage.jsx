import { useEffect, useState } from "react";
import albumsService from "../services/albums.service";
import { Link, useParams } from "react-router-dom";

function AlbumsListPage() {
  const [albums, setAlbums] = useState([]);
  const {albumId} = useParams();

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
    <div>
      <p>album list:</p>
      <button>
        <Link to="/create-album">Create New Album</Link>
      </button>

      {albums.map((album) => (
        <>
          <p>{album.albumImage}</p>
          
          <Link key={album._id} to={`/albums/${albumId}`}>
            <h2>{album.albumName}</h2>
          </Link>
        </>
      ))}
    </div>
  );
}

export default AlbumsListPage;
