import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
          headers: {
            'Authorization': 'Bearer 1POdFZRZbvb...qqillRxMr2z' // Your Spotify access token
          }
        });

        if (response.status === 200) {
          setAlbums(response.data.albums.items);
        } else {
          console.error('Failed to fetch data from Spotify API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
      <h1>New Album Releases</h1>
      <div>
        {albums.map(album => (
          <div key={album.id}>
            <h2>{album.name}</h2>
            <img src={album.images[0].url} alt={album.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
