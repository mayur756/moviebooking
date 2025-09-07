const Admin = require("../model/adminschema")
const jwt = require("jsonwebtoken");
const getadmin = async (req, res) => {

    let data = await Admin.find()
    res.send(data)

}


const loginadmin = async (req, res) => {
    try {
        const { email, password } = req.body;
      
       const  existadmin = await Admin.findOne({ email: email ,password:password })
        const token = jwt.sign({ id: existadmin._id }, process.env.SECRET_KEY, {
            expiresIn: "7d"
        });
         return res.status(200).json({
      message: "Login successful",
      token,
      id:existadmin._id,
    });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
    
    
   
}

module.exports = { getadmin, loginadmin }