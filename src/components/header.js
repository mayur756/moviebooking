import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userId"); // clear saved user
    navigate("/auth");
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Movie Booking
        </Typography>

        <Box>
          {isLoggedIn ? (
            <>
              <Button component={Link} to="/movie" sx={{ color: "white" }}>
                Movies
              </Button>
              <Button component={Link} to="/profile" sx={{ color: "white" }}>
                Profile
              </Button>
              <Button onClick={handleLogout} sx={{ color: "white" }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/auth" sx={{ color: "white" }}>
                Login / Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
