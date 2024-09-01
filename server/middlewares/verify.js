const jwt = require("jsonwebtoken")
const verifyauth = async(req,res)=>{
    try{
        const token = req.cookies.token
        if(token){
            await  jwt.verify(token,process.env.JWTSECRET,(decode,err)=>{
                if(err){
                    res.status(402).json({msg:"not authorised",error:err})
                }
                else{
                    username._id = decode;
                    next();
                }
            })
        }
        else{
            res.status(404).json({msg:"token not found"});   
        }
    }
    catch(err){
        res.status(500).json({msg:"internal server error"});
    }
}
module.exports = {verifyauth}