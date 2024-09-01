const user = require("../models/usermodel")
const bcrypt = require("bcryptjs")
const checkemail = async(req,res)=>{
    const{email} = req.body
    try{
        const finduser = await user.find({email:email})
        if(!finduser){
            res.status(404).json({success:false,msg:"user not found"}) // error
        }
        else{
            res.status(200).json({success:true,msg:"User found"}) // redirect to the password setting page
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error",err:err})
    }
}
const resetpassword = async(req,res)=>{
    const {email} = req.body
    const {newpassword} = req.body;
    const hashed = bcrypt.hash(newpassword,15);
    try{
        const finduser = await user.find({email:email})
        await finduser.update({password:hashed}).save().then(()=>{
            res.status(200).json({success:true,msg:"Password successfully changed!"})
        }).catch(err =>{
            res.status(401).json({success:false,error:err,msg:"Password not changed!"})
        })
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error",err:err})
    }
}
module.exports = {resetpassword,checkemail}