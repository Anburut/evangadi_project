import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Netflix Originals...");
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log("TMDB Response:", request.data);

        const results = request.data?.results || [];
        if (results.length === 0) {
          console.warn("No movies found!");
          return;
        }

        // Pick a random movie
        const randomMovie =
          results[Math.floor(Math.random() * results.length)];
        console.log("Random movie:", randomMovie);
        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    };

    fetchData();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  if (!movie) return null; // Prevent rendering until movie is fetched

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_content">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner_fadeBottom"></div>
    </div>
  );
};

export default Banner;
