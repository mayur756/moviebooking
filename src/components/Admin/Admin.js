import React from "react";
import Authform from "../Auth/Authform";
import { sendadminauth } from "../../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";

const Admin = () => {
     const navigate = useNavigate()
     const getData = (data) => {
  sendadminauth(data.inputs)
    .then((res) => {
      console.log(res);
      if (res.token && res.id) {
        // Save token & admin id
        localStorage.setItem("token", res.token);
        localStorage.setItem("adminid", res.id);

        // Redirect only after successful login
        navigate("/Addmovie");
      } else {
        alert("Login failed");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Something went wrong");
    });
};

  return (
    <div>
        <Authform onSubmit={getData } isAdmin={true}></Authform>
    </div>
  );
};

export default Admin;
