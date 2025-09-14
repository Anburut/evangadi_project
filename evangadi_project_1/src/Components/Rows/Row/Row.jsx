// Row.jsx
import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow, currentTrailer, setCurrentTrailer }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    // If same trailer clicked → close it
    if (currentTrailer.videoId && currentTrailer.rowTitle === title) {
      setCurrentTrailer({ videoId: "", rowTitle: "" });
      return;
    }

    const possibleTitles = [
      movie?.title,
      movie?.name,
      movie?.original_name,
      movie?.title + " official trailer",
      movie?.name + " official trailer",
      movie?.original_name + " official trailer",
    ].filter(Boolean);

    for (const t of possibleTitles) {
      try {
        const url = await movieTrailer(t);
        if (url) {
          const urlParams = new URLSearchParams(new URL(url).search);
          setCurrentTrailer({ videoId: urlParams.get("v"), rowTitle: title });
          return;
        }
      } catch (err) {
        // keep trying
      }
    }

    console.log("No trailer found for:", movie);
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>

      {/* Show trailer only if it belongs to this row */}
      {currentTrailer.videoId && currentTrailer.rowTitle === title && (
        <YouTube videoId={currentTrailer.videoId} opts={opts} />
      )}
    </div>
  );
};

export default Row;
