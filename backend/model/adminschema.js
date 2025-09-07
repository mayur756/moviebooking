const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: String,
    addmovies: [
        { type: mongoose.Types.ObjectId, ref: "movie" },]
})
let Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;