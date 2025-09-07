const User = require("../model/user.schema");
const booking=require("../model/booking");
const getUser = async (req, res) => {

    let data = await User.find()
    res.send(data)

}

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

const updateuser = async (req,res)=>{
    const id=req.params.id;
    const {name,email,password}=req.body;

    let user;
    user=await User.findByIdAndUpdate(id,{name,email,password});

    if(!user){
        res.status(500).json({message:"something wrong.."})
    }

    res.status(200).json({message:"updated succesfully.."})
}


const deleteuser=async(req,res)=>{
   const id=req.params.id;
   let user;
    user=await User.findByIdAndDelete(id);
    if(!user){
        res.status(500).json({message:"something wrong.."})
    }

    res.status(200).json({message:"delted succesfully.."})
}

const loginup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    if (password !== existingUser.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: existingUser
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const allbookinguser = async (req, res) => {
  try {
    const userId = req.params.id;

    const userBookings = await booking
      .find({ user: userId })
      .populate("movie"); // ✅ populate movie details

    return res.status(200).json({ bookings: userBookings });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("bookings");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { getUser,createUser,updateuser,deleteuser,loginup,allbookinguser,getUserById}