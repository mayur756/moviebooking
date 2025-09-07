import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Movieitem = ({ title, releaseDate, posterurl, id }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 300,           // fixed width
        height: 420,          // fixed height for all
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {/* Poster image */}
      <img
        src={posterurl || "https://via.placeholder.com/300x200?text=No+Poster"}
        alt={title}
        style={{
          width: "100%",
          height: "200px",     
          objectFit: "cover",  
        }}
      />

      {/* Card content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>

      {/* Button at bottom */}
      <CardActions>
        <Button LinkComponent={Link} to={`/booking/${id}`} sx={{ margin: "auto" }} size="small">
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default Movieitem;
