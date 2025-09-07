const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  movie: { type: mongoose.Types.ObjectId, ref: "Movie", required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  seatnumber: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("booking", bookingSchema);
