const issue = require("../models/productissuemodel");
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
const deleteissue = async(req,res) =>{
    const issueid = req.params.id;
    try{
        const findissue = await issue.findByIdAndDelete({_id:issueid});
        if(findissue){
            re.status(200).json({success:true,msg:"Issue is deleted successfully"})
            console.log("Issue deleted")
        }
        else{
            res.status(401).json({success:false,msg:"Something went wrong!"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"})
    }
}
const getissues = async(req,res) =>{
    const productid = req.params.id;
    try{
        const data = await issue.findById({_id:productid})
        if(data){
            res.status(200).json({success:true,data:data})
        }
        else{
            res.status(401).json({success:false,msg:"Somethikng went wrong!"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"})
    }
}
const getsingleissue = async(req,res)=>{
    try{
        const findissuebyid = await issue.findById({_id:req.params.id});
        if(findissuebyid){
            res.status(200).json({success:true,data:findissuebyid})
            console.log("success!")
        }
        else{
            res.status(401).json({success:false,msg:"Somethikng went wrong!"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"})
    }
}
module.exports = {createissue,deleteissue,getissues,getsingleissue}
