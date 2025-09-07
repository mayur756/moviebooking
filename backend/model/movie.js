const mongoose = require("mongoose")
const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    actors:[{type:String,required:true}],
    releaseDate:{
        type:String,
        reuired:true,
    },
    posterurl:{
        type:String,
        reuired:true,
    },
    featured:{
        type:Boolean,
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
    admin:{
        type:mongoose.Types.ObjectId,
        ref: "Admin",
        reuired:true,
    }

})
let Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;