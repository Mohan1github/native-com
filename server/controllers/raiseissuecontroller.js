const issue = require("../models/reviewmodel");
const createissue = async(req,res)=>{
    const issueid = req.body.issueid
    try{
        const findissue = await issue.find({_id:issueid})
        if(findissue){
            const newissue = req.body;
            const issue = newissue.select("complaint")
            const pushed  = await findissue.complaint.push(issue);
            if(pushed){
                try{
                    await issue.save();
                }
                catch(err){
                    console.log(err);
                    res.status(401).json({success:false,error:err})
                }
            }
        }
        else{
            const issue = new issue(req.body);
            issue.save().then(()=>{
                res.status(201).json({success:true,msg:"Issue crated successfully!"})
            }).cathc(err =>{res.status(401).json({success:false,msg:"Issuse not created!",error:err})})
        }
    }
    catch(err){
        res.statua(500).json({success:false,msg:"Internal server error"});
    }
}

module.exports = {createissue}
