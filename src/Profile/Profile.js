import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userid");

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8090/user/booking/${userId}`
        );
        setBookings(res.data.bookings);
      } catch (err) {
        console.error("Fetch bookings error:", err);
      }
    };

    if (userId) fetchBookings();
  }, [userId]);

  // Delete booking
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/booking/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert("Booking deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      {bookings.length === 0 && <Typography>No bookings yet</Typography>}

      {bookings.map((b) => (
        <Box
          key={b._id}
          mb={2}
          p={2}
          border="1px solid #ccc"
          borderRadius={2}
        >
          <Typography>Movie: {b.movie.title}</Typography>
          <Typography>Date: {b.date}</Typography>
          <Typography>Seat: {b.seatnumber}</Typography>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(b._id)}
            sx={{ mr: 2, mt: 1 }}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate(`/booking/${b.movie._id}?bookingId=${b._id}`)
            }
            sx={{ mt: 1 }}
          >
            Update
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Profile;
