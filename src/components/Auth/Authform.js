import { 
  Box, Button, Dialog, FormLabel, IconButton, 
  TextField, Typography, Avatar, Paper 
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const labelstyle = { mt: 1, mb: 1 };

const Authform = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <Dialog open={true}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 400,
          borderRadius: 3,
        }}
      >
        {/* Close button */}
        <Box sx={{ ml: "auto", mb: -4 }}>
          <IconButton>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {/* Icon */}
        <Avatar sx={{ m: 1, bgcolor: "#2b2d42" }}>
          <LockOutlinedIcon />
        </Avatar>

        {/* Title */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {isAdmin ? "Admin Login" : isSignup ? "Signup" : "Login"}
        </Typography>

        {/* Form */}
        <form onSubmit={handlesubmit} style={{ width: "100%" }}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width="100%"
          >
            {!isAdmin && isSignup && (
              <>
                <FormLabel sx={labelstyle}>username</FormLabel>
                <TextField
                  value={inputs.username}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                />
              </>
            )}

            <FormLabel sx={labelstyle}>Email</FormLabel>
            <TextField
              value={inputs.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              name="email"
              placeholder="Enter your email"
            />

            <FormLabel sx={labelstyle}>Password</FormLabel>
            <TextField
              value={inputs.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              type="password"
              name="password"
              placeholder="Enter your password"
            />

            {/* Submit button */}
            <Button
              sx={{
                mt: 3,
                borderRadius: 3,
                bgcolor: "#2b2d42",
                "&:hover": { bgcolor: "#1a1c2c" },
              }}
              type="submit"
              variant="contained"
              fullWidth
            >
              {isSignup ? "Signup" : "Login"}
            </Button>

            {/* Switch button (only for users, not admin) */}
            {!isAdmin && (
              <Button
                onClick={() => setIsSignup(!isSignup)}
                sx={{ mt: 2, borderRadius: 2 }}
                fullWidth
              >
                {isSignup
                  ? "Already have an account? Login"
                  : "Don't have an account? Signup"}
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Dialog>
  );
};

export default Authform;
