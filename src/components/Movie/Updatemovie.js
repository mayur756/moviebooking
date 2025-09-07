
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { getmoviebyid, updateMovie } from "../../api-helpers/api-helpers";

const UpdateMovie = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterurl: "",
    releaseDate: "",
  });

  useEffect(() => {
    getmoviebyid(id)
      .then((res) => setInputs(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(id, inputs)
      .then(() => {
        alert("Movie updated successfully!");
        window.location.href = "/admin/movies"; // redirect back
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box p={5}>
      <Typography variant="h5" mb={2}>
        Update Movie
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormLabel>Title</FormLabel>
        <TextField value={inputs.title} name="title" onChange={handleChange} fullWidth margin="normal" />
        <FormLabel>Description</FormLabel>
        <TextField value={inputs.description} name="description" onChange={handleChange} fullWidth margin="normal" />
        <FormLabel>Poster URL</FormLabel>
        <TextField value={inputs.posterurl} name="posterurl" onChange={handleChange} fullWidth margin="normal" />
        <FormLabel>Release Date</FormLabel>
        <TextField type="date" value={inputs.releaseDate?.split("T")[0]} name="releaseDate" onChange={handleChange} fullWidth margin="normal" />
        
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default UpdateMovie;
