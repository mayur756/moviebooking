import { Box, Button, Checkbox, FormLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addmovie } from "../../api-helpers/api-helpers";

const LabelProps = {
  mt: 1,
  mb: 1,
};

const Addmovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterurl: "",
    releaseDate: "",
    featured: false,
  });

  const [actorInput, setActorInput] = useState(""); // single actor input
  const [actors, setActors] = useState([]); // array of actors

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleAddActor = () => {
    if (actorInput.trim() !== "") {
      setActors((prev) => [...prev, actorInput.trim()]);
      setActorInput(""); // clear input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actors.length === 0) {
      alert("Add at least one actor");
      return;
    }

    addmovie({ ...inputs, actors }) // send actors array to backend
      .then((res) => {
        console.log(res);
        alert("Movie added successfully!");
      })
      .catch((err) => console.log(err));

    console.log({ ...inputs, actors });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add Movie
          </Typography>

          <FormLabel sx={LabelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
            required
          />

          <FormLabel sx={LabelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
            required
          />

          <FormLabel sx={LabelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterurl}
            onChange={handleChange}
            name="posterurl"
            variant="standard"
            margin="normal"
            required
          />

          <FormLabel sx={LabelProps}>Release Date</FormLabel>
          <TextField
            type="date"
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
            required
          />

          <FormLabel sx={LabelProps}>Actors</FormLabel>
          <Box display="flex" gap={1} alignItems="center">
            <TextField
              value={actorInput}
              onChange={(e) => setActorInput(e.target.value)}
              variant="standard"
              margin="normal"
              placeholder="Add actor"
            />
            <Button type="button" onClick={handleAddActor} variant="outlined">
              Add
            </Button>
          </Box>
          <Box mb={2}>
            {actors.map((actor, idx) => (
              <Typography key={idx} variant="body2">
                {actor}
              </Typography>
            ))}
          </Box>

          <FormLabel sx={LabelProps}>Featured</FormLabel>
          <Checkbox
            sx={{ mr: "auto" }}
            checked={inputs.featured}
            onChange={(e) => setInputs((prev) => ({ ...prev, featured: e.target.checked }))}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": { bgcolor: "blue" },
            }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Addmovie;
