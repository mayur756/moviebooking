import axios from "axios";

export const senduserAuthrequest = async(inputs,signup)=>{
   try {
    const res = await axios.post(
      `/user/${signup ? "signup" : "login"}`,
      {
        username: signup ? inputs.username : "", 
        email: inputs.email,
        password: inputs.password,
      }
    );

    return res.data;
  } catch (err) {
    console.error("❌ API error:", err.response?.data || err.message);
    throw err;
  }
}


export const sendadminauth=async(data)=>{
   const res=await  axios.post("/admin/login",{
        email:data.email,
        password:data.password
     }).catch((err)=>console.log(err));

     if(res.status!==200){
        return console.log("unxcpted error");
        
     }

     const resdata=await res.data;
     return resdata;
}


export const getallmovie = async () => {
  try {
    const res = await axios.get("/movie");
    return res.data;
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    return null;
  }
};

export const newbooking = async (data) => {
   try {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      alert("You must be logged in to book a movie.");
      return null;
    }

    const res = await axios.post("http://localhost:8090/booking", {
      movie: data.movie,
      seatnumber: data.seatnumber,
      date: data.date,
      user: userId,
    });

    console.log("✅ Booking success:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Booking failed:", err.response?.data || err.message);
    return null;
  }
};
export const getmoviebyid = async (id) => {
  try {
    const res = await axios.get(`/movie/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching movie by id:", err.message);
    return null;
  }
};


export const updateBooking = async (id, data) => {
  try {
    const res = await axios.patch(`http://localhost:8090/booking/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("❌ Update booking failed:", err.response?.data || err.message);
    return null;
  }
};

export const deleteBooking = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8090/booking/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Delete booking failed:", err.response?.data || err.message);
    return null;
  }
}


export const addmovie = async (data) => {
  const token = localStorage.getItem("token"); // must exist
  if (!token) {
    alert("Admin not logged in!");
    return;
  }

  try {
    const res = await axios.post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterurl: data.posterurl,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminid"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ must include 'Bearer'
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log("Add movie failed:", err.response?.data || err);
    throw err;
  }
};
  ;
