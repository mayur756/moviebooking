  import { Route, Routes, Navigate } from "react-router-dom";
  import { useState } from "react";
  import Header from "./components/header";
  import Homepage from "./components/Homepage";
  import Movie from "./components/Movie/Movie";
  import Admin from "./components/Admin/Admin";
  import Auth from "./components/Auth/Auth";
  import Booking from "./components/Bookings/Booking";
  import Profile from "./Profile/Profile";
import Addmovie from "./components/Movie/Addmovie";
  function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userid"));

    return (
      <div>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <section>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Homepage /> : <Navigate to="/Auth" />}
            />

            <Route path="/Movie" element={<Movie />} />
            <Route path="/Admin" element={<Admin />} />
        


            {/* Auth page: redirect if already logged in */}
            <Route
              path="/Auth"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Auth setIsLoggedIn={setIsLoggedIn} />
              }
            />

            {/* Booking & Profile */}
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/Auth" />} />
            <Route path="/Addmovie" element={<Addmovie />} />
          </Routes>
        </section>
      </div>
    );
  }

  export default App;
