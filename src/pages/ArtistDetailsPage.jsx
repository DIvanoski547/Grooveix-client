import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const client_id = "c60f0049bfc041a5a26d2fb2e1cef823";
const client_secret = "75daf3ab6adc4ff88c150744a952a965";

const ArtistInfo = () => {
  const [token, setToken] = useState("");
  const [artist, setArtist] = useState(null);
  const { artistId } = useParams();
  const accessToken = token;

  // USE EFFECT TO RETRIVE THE TOKEN FROM SPOTIFY API
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

  // USE EFFECT TO RETRIVE ARTIST INFO FROM SPOTIFY API
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response, "response data");
          setArtist(response.data);
        }
        //  else {
        //   console.error('Failed to fetch artist:', response.statusText);
        // }
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchArtist();
  }, [artistId]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-3">
        <h2>{artist.name}</h2>
        <img src={artist.images[0].url} alt={artist.name} />
        <p>Followers: {artist.followers.total}</p>
        <p>Genres: {artist.genres.join(", ")}</p>
        <p>Popularity: {artist.popularity}</p>
      </div>

      <Link to={"/homepage"}>
        {" "}
        <button className="btn-magenta">Back</button>
      </Link>
      <Footer />
    </div>
  );
};

export default ArtistInfo;
