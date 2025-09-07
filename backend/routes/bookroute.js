const { Router } = require("express");
const {updatebooking, deletebooking, getallbookings, newbooking } = require("../controllers/bookcontroller");
const bookroute=Router();





bookroute.get("/allbooking",getallbookings);
bookroute.post("/",newbooking);
bookroute.patch("/:id",updatebooking);
bookroute.delete("/:id",deletebooking);
module.exports={bookroute};