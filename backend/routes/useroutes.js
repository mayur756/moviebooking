const { Router } = require("express");
const { getUser, createUser, updateuser, deleteuser, loginup, allbookinguser, getUserById } = require("../controllers/user.controller");


const userrouter=Router();

userrouter.get("/",getUser);
userrouter.get("/:id",getUserById)
userrouter.post("/signup",createUser);
userrouter.patch("/:id",updateuser);
userrouter.delete("/:id",deleteuser);
userrouter.post("/login",loginup)
userrouter.get("/booking/:id",allbookinguser)


module.exports =userrouter