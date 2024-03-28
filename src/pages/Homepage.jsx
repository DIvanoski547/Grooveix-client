import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import albumsService from "../services/albums.service";
import { Link } from "react-router-dom";

const client_id = "c60f0049bfc041a5a26d2fb2e1cef823";
const client_secret = "75daf3ab6adc4ff88c150744a952a965";

function Homepage() {
  const [token, setToken] = useState("");
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const accessToken = token;

// --------------------GET ALL ALBUMS FROM DATABASE----------------------------//
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
// ----------------------------------------------------------------------------//


  // USE EFFECT TO ACCESS TOKEN FROM SPOTIFY API
  useEffect(() => {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
      },
      data: "grant_type=client_credentials",
    };

    axios
      .post(authOptions.url, authOptions.data, {
        headers: authOptions.headers,
      })
      .then((response) => {
        if (response.status === 200) {
          setToken(response.data.access_token);
        } else {
          console.error("Failed to get access token:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error getting access token:", error);
      });
  }, []);

  //USE EFFECT TO RETRIVE NEW RELEASES FROM SPOTIFY API
  useEffect(() => {
    const fetchNewreleasesData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            params: {
              limit: 5,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setNewReleasesData(response.data);
        } else {
          console.error("Failed to fetch artist data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    fetchNewreleasesData();
  }, [accessToken]);

  //USE EFFECT TO RETRIVE POPULAR ARTISTS FROM SPOTIFY API
  useEffect(() => {
    const fetchPopularArtists = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          params: {
            q: 'genre:"pop"',
            type: "artist",
            limit: 5,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setPopularArtists(response.data.artists.items);
        } else {
          console.error(
            "Failed to fetch popular artists:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching popular artists:", error);
      }
    };

    if (accessToken) {
      fetchPopularArtists();
    }
  }, [accessToken]);

  // USE EFFECT TO RETRIVE RECOMMENDED POP TRACKS FROM SPOTIFY API
  useEffect(() => {
    const fetchRecommendedSongs = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/recommendations",
          {
            params: {
              popularity: ">80",
              limit: 10,
              // market: "ES",
              // seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
              seed_genres: "pop",
              // seed_tracks: "0c6xIDDpzE81m2q797ordA",
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setRecommendedSongs(response.data.tracks);
        } else {
          console.error(
            "Failed to fetch recommended songs:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching recommended songs:", error);
      }
    };

    fetchRecommendedSongs();
  }, [accessToken]);

  return (
    <div>
      <Navbar />
      <br />

      <div>
        {" "}
        {/* SHOW NEW RELEASES ON THE HOME PAGE */} <h2>New Releases: </h2>
        {newReleasesData.albums &&
          newReleasesData.albums.items.map((oneAlbum) => (
            <div key={oneAlbum.id} className="album-card">
              <img
                src={oneAlbum.images[0].url}
                alt={oneAlbum.name}
                width={300}
              />
              <p>Album name: {oneAlbum.name}</p>
              <p>Tracks: {oneAlbum.total_tracks}</p>
            </div>
          ))}
      </div>

      <div>
        {" "}
        {/* SHOW TOP ARTISTS ON THE HOME PAGE */} <h2>Top Artists: </h2>
        {popularArtists.map((oneArtist) => (
          <div key={oneArtist.id} className="album-card">
            <img
              src={oneArtist.images[0].url}
              alt={oneArtist.name}
              width={300}
            />
            <p>{oneArtist.name}</p>
            <p>Popularity rating: {oneArtist.popularity}</p>
          </div>
        ))}
      </div>

      <div>
        {" "}
        {/* SHOW TOP ARTISTS ON THE HOME PAGE */} <h2>Recomended Tracks: </h2>
        {recommendedSongs.map((song) => (
          <div key={song.id} className="album-card">
            <br />
            <img src={song.album.images[0].url} alt={song.name} />
            <p>Track name: {song.name}</p>
            <p>Artist: {song.artists[0].name}</p>
          </div>
        ))}
      </div>
      {/* // --------------------RETURN----------------------------// */}
      <h3>Album list:</h3>

{albums.map((album) => (
  <Link to={`/albums/${album._id}`} key={album._id}>
    <div className="album-card">
      <img
        src={album.albumImage}
        alt={album.albumName}
        width={300}
        height={300}
      />{" "}
      {/* INLINE CODE TO NE REMOVED LATER */}
      <h2>{album.albumName}</h2>
    </div>
  </Link>
))}
{/* // -----------------------------------------------------// */}
    </div>
  );
}

export default Homepage;
