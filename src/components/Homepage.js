import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Movieitem from "./Movie/Movieitem";
import { Link } from "react-router-dom";
import { getallmovie } from "../api-helpers/api-helpers";

const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getallmovie()
      .then((data) => {
        console.log("Fetched movies:", data);
        if (data?.movies) {
          setMovies(data.movies);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" height="100%" margin="auto" marginTop={2}>
      {/* Banner */}
      <Box margin="auto" width="80%" height="70vh" padding={2}>
        <img
          src="https://www.yashrajfilms.com/images/default-source/movies/war2/war2_767x430.jpg?sfvrsn=8e46decc_7"
          alt="war2"
          width="100%"
          height="100%"
        />
      </Box>

      {/* Title */}
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign="center">
          Latest Release
        </Typography>
      </Box>

      {/* Movies Grid */}
      <Box
        marginLeft={20}
        display="flex"
        width="80%"
        justifyContent="center"
        flexWrap="wrap"
      >
        {movies &&
          movies.slice(0,4).map((movie) => (
            <Movieitem
              key={movie._id}
              id={movie._id}
              title={movie.title}
              posterurl={movie.posterurl}
              releaseDate={movie.releaseDate}
            />
          ))}
      </Box>

      {/* View All Movies Button */}
      <Box display="flex" justifyContent="center" padding={7} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movie"
          variant="outlined"
          sx={{
            margin: "auto",
            color: "#2b2d42",
            borderColor: "#2b2d42",
            paddingX: 3,
            paddingY: 1,
            textTransform: "none",
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Homepage;
