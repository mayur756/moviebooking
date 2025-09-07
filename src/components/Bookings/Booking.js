import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getmoviebyid, newbooking } from "../../api-helpers/api-helpers";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const Booking = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  console.log("Movie id from URL:", id)
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ seatnumber: "", date: "" });

  useEffect(() => {
    getmoviebyid(id)
      .then((res) => setMovie(res?.movie))
      .catch((err) => console.log("❌ Error fetching movie:", err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     const payload = { 
    ...inputs, 
    movie: movie._id, 
    user: localStorage.getItem("userid") // ✅ add logged-in user
  };

  console.log("📤 Sending booking payload:", payload);

  const result = await newbooking(payload);

  if (result && result.booking) {
    alert("🎉 Booking Successful!");
    navigate("/movie");
  } else {
    alert("❌ Booking failed. Please try again.");
  }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop={5}>
      <Card sx={{ maxWidth: 600, width: "90%", borderRadius: 4, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Book Your Movie
          </Typography>

          {movie && (
            <>
              <Box display="flex" justifyContent="center" marginBottom={2}>
                <img
                  src={movie.posterurl}
                  alt={movie.title}
                  style={{ width: "200px", borderRadius: "10px" }}
                />
              </Box>

              <Typography variant="h6" textAlign="center">
                {movie.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                textAlign="center"
                marginBottom={3}
              >
                {movie.description}
              </Typography>
            </>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              fullWidth
              type="text"
              label="Seat Number"
              name="seatnumber"
              value={inputs.seatnumber}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, bgcolor: "#2b2d42", borderRadius: 2 }}
            >
              Confirm Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Booking;
