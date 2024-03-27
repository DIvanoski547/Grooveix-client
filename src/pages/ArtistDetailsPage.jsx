import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ArtistDetailsPage() {
  // const [token, setToken] = useState("");
  const [artistData, setArtistData] = useState(null);
  const accessToken = token;

  //USE EFFECT TO RETRIVE ARTIST DETAILS FROM SPOTIFY API
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setArtistData(response.data);
        } else {
          console.error("Failed to fetch artist data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    fetchArtistData();
  }, [accessToken]);

  return (
    <div>
      <Navbar />
      <p>Access Token: {token}</p>
      {artistData ? (
        <div className="album-card">
          <img
            src={artistData.images[0].url}
            alt={artistData.name}
            width={350}
          />
          <h1>{artistData.name}</h1>
          <p>Followers: {artistData.followers.total}</p>
          <p>Genres: {artistData.genres.join(", ")}</p>
          <p>Popularity: {artistData.popularity}</p>
        </div>
      ) : (
        <p>Loading artist data...</p>
      )}
    </div>
  );
}

export default ArtistDetailsPage;
