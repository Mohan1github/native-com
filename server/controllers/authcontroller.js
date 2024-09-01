const  user  = require("../models/usermodel");
const jwt  = require("jsonwebtoken");
const  brcypt  = require("bcryptjs");
const register = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    const check = await user.find({ email: email });
    if (check) {
      res.status(400).json({ msg: "User has already exist" });
    } else {
      const hashed = brcypt.hash(password, 15);
      const newuser = new user({
        username: username,
        email: email,
        password: hashed,
        phone: phone,
      });
      const saved = await newuser.save();
      if (saved) {
        res.status(201).json({ msg: "new user added" });
      } else {
        res.status(401).json({ msg: "error creating user" });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkuser = await user.findOne({ email: email });
    if (checkuser) {
      const verifypassword = await bcrypt.compare(password, checkuser.password);
      if (verifypassword) {
        const token =  jwt.sign(
          { userid: checkuser._id,admin:checkuser.isAdmin },
          process.env.JWTSECRET,
          { expiresIn: "1d" }
        );
        const {password:pass,...info} = checkuser._doc
        if (token) {
          res.cookie("token", token);
          res.status(200).json({success:true,msg:"Logged in successfully",userdata:info})
        } else {
          res.status(401).json({ msg: "error creating the access token" });
        }
      } else {
        res.status(401).json({ msg: "invalid password" });
      }
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const logout = async(req,res)=>{
    try{
       await res.cookie("token","").then(()=>{
        res.status(200).json({success:true,msg:"logged out successfully"})
       }).catch(err =>{
        console.log(err)
        res.status(401).json({success:false,msg:"not logged out"})
       })
        }
    catch(err){
      res.status(500).json({ msg: "internal server error" });
    }
}
module.exports = { register,login ,logout};
