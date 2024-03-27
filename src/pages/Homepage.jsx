import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const client_id = "c60f0049bfc041a5a26d2fb2e1cef823";
const client_secret = "75daf3ab6adc4ff88c150744a952a965";

function Homepage() {
  const [token, setToken] = useState("");
  const [newReleasesData, setNewReleasesData] = useState([]);
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

  //USE EFFECT TO RETRIVE NEW RELEASES FROM SPOTIFY API
  useEffect(() => {
    const fetchNewreleasesData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            params: {
              limit: 5
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

  return (
    <div>
      <Navbar />
      <br />
      {/* SHOW NEW RELEASES ON THE HOME PAGE */}
      <h2>New Releases: </h2>
      {newReleasesData.albums && newReleasesData.albums.items.map(oneAlbum => (
      <div key={oneAlbum.id} className="album-card">
        <img src={oneAlbum.images[0].url} alt={oneAlbum.name} />
        <p>Album name: {oneAlbum.name}</p>
        <p>Tracks: {oneAlbum.total_tracks}</p>
      </div>
    ))}
    </div>
  );
}

export default Homepage;
