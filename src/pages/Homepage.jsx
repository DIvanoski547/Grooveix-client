import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import albumsService from "../services/albums.service";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const client_id = "c60f0049bfc041a5a26d2fb2e1cef823";
const client_secret = "75daf3ab6adc4ff88c150744a952a965";

function Homepage() {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);
  // const [recommendedSongs, setRecommendedSongs] = useState([]);
  const accessToken = token;

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
  // useEffect(() => {
  //   const fetchRecommendedSongs = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.spotify.com/v1/recommendations",
  //         {
  //           params: {
  //             popularity: ">80",
  //             limit: 10,
  //             // market: "ES",
  //             // seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
  //             seed_genres: "pop",
  //             // seed_tracks: "0c6xIDDpzE81m2q797ordA",
  //           },
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         setRecommendedSongs(response.data.tracks);
  //       } else {
  //         console.error(
  //           "Failed to fetch recommended songs:",
  //           response.statusText
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching recommended songs:", error);
  //     }
  //   };

  //   fetchRecommendedSongs();
  // }, [accessToken]);

  // LOGIC TO SHOW ALBUMS ON THE HOME PAGE
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
      <Navbar />
      <br />

      {/* SHOW ALBUMS ON THE HOME PAGE */}
      <div>
        <h2>Album list</h2>
        {albums.map((album) => (
          <div className="card-wrapper" key={album._id}>
            <Link to={`/albums/${album._id}`}>
              <div className="album-card">
                <img src={album.albumImage} alt={album.albumName} />
                <h2>{album.albumName}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* SHOW TOP ARTISTS ON THE HOME PAGE */}
      <div>
        <h2>Top Artists</h2>
        {popularArtists.map((oneArtist) => (
          <div className="album-card" key={oneArtist.id}>
            <Link to={`/artists/${oneArtist.id}`}>
              <img src={oneArtist.images[0].url} alt={oneArtist.name} />
            </Link>
            <p><b>{oneArtist.name}</b></p>
            <p>⭐ {oneArtist.popularity}</p>
            <p>♫ {oneArtist.genres}</p>
            <p>🤵{oneArtist.followers.total}</p>
          </div>
        ))}
      </div>

      {/* SHOW RECOMENDED TRACKS ON THE HOME PAGE */}
      {/* <div>
        {" "}
        <h2>Recomended Tracks: </h2>
        {recommendedSongs.map((song) => (
          <div key={song.id} className="album-card">
            <br />
            <img src={song.album.images[0].url} alt={song.name} />
            <p>Track name: {song.name}</p>
            <p>Artist: {song.artists[0].name}</p>
          </div>
        ))}
      </div> */}
      <Footer />
    </div>
  );
}

export default Homepage;
