const mongoose = require("mongoose");
const Movie = require("../model/movie");
const User = require("../model/user.schema");
const booking = require("../model/booking");


const newbooking = async (req, res) => {
  try {
    const { movie, date, seatnumber, user } = req.body;

    const existmovie = await Movie.findById(movie);
    if (!existmovie) return res.status(404).json({ message: "Movie not found" });

    const existuser = await User.findById(user);
    if (!existuser) return res.status(404).json({ message: "User not found" });

    const session = await mongoose.startSession();
    session.startTransaction();

    const newBooking = new booking({ movie, date, seatnumber, user }); // renamed instance
    await newBooking.save({ session });

    existuser.bookings.push(newBooking._id);   
    existmovie.bookings.push(newBooking._id);  

    await existuser.save({ session });
    await existmovie.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
const getallbookings = async (req, res) => {
  try {
    const bookings = await booking.find()
      .populate("movie", "title description")
      .populate("user", "username email");

    return res.status(200).json({ bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};








const updatebooking = async (req, res) => {
  try {
    const id = req.params.id;
    const { movie, date, seatnumber, user } = req.body;

    const updatedBooking = await booking.findByIdAndUpdate(
      id,
      { movie, date, seatnumber, user },
      { new: true } // <-- returns the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Updated successfully", booking: updatedBooking });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
const deletebooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBooking = await booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Deleted successfully", booking: deletedBooking });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};
module.exports={newbooking,updatebooking,deletebooking,getallbookings}