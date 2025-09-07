import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getallmovie } from "../../api-helpers/api-helpers"; // adjust path if needed
import Movieitem from "./Movieitem";

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getallmovie()
      .then((data) => {
        console.log("Fetched movies:", data);
        if (data?.movies) {
          setMovies(data.movies);  // ✅ use the array from backend
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin="auto" marginTop={4}>
      {/* Title */}
      <Typography
        margin="auto"
        variant="h4"
        padding={2}
        width="40%"
        bgcolor="#900C3F"
        color="white"
        textAlign="center"
      >
        All Movies
      </Typography>

      {/* Movie Grid */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        marginTop={3}
      >
        {movies &&
          movies.map((movie) => (
            <Movieitem
              key={movie._id}
              id={movie._id}
              title={movie.title}
              posterurl={movie.posterurl}
              releaseDate={movie.releaseDate}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movie;
