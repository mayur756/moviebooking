import React from "react";
import Authform from "./Authform";
import { useNavigate } from "react-router-dom";
import { senduserAuthrequest } from "../../api-helpers/api-helpers";

const Auth = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleAuth = async ({ inputs, signup }) => {
    try {
      // call backend API
      const data = await senduserAuthrequest(inputs, signup);
      console.log("Auth data from backend:", data);

      if (!data?.user?._id) {
        alert("Authentication failed");
        return;
      }

      // store user ID in localStorage
      localStorage.setItem("userid", data.user._id);

      setIsLoggedIn(true);

      if (signup) {
        alert("Signup successful! Please login now.");
        navigate("/Auth"); // redirect to login
      } else {
        alert(`Login successful! Welcome ${data.user.username}`);
        navigate("/"); // redirect to home
      }
    } catch (err) {
      console.error("❌ Auth error:", err);
      alert("Authentication failed. Please check your credentials.");
    }
  };

  return <Authform onSubmit={handleAuth} />;
};

export default Auth;
