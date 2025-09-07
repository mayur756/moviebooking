import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { getallmovie, deleteMovie } from "../../api-helpers/api-helpers";

const MoviesAdmin = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getallmovie()
      .then((res) => {
        setMovies(res.movies); // assuming your backend returns { movies: [...] }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteMovie(id)
      .then(() => {
        alert("Movie deleted!");
        setMovies((prev) => prev.filter((movie) => movie._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box p={5}>
      <Typography variant="h4" mb={3}>
        Manage Movies
      </Typography>
      {movies.length === 0 ? (
        <Typography>No movies found</Typography>
      ) : (
        movies.map((movie) => (
          <Box
            key={movie._id}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            mb={2}
            boxShadow="2px 2px 10px #ccc"
            borderRadius="8px"
          >
            <Typography variant="h6">{movie.title}</Typography>
            <Box>
              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={() => (window.location.href = `/admin/movie/${movie._id}`)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(movie._id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default MoviesAdmin;
