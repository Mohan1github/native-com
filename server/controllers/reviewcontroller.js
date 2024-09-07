const express = require("express")
const review = require("../models/reviewmodel")
const product = require("../models/productissuemodel")
const createreview = async(req,res)=>{
    const prodid = req.params.productid
    try{
        const findproduct = await product.findById({_id:prodid});
         if(!findproduct){
            console.log("Product not found");
            return res.status(404).json({msg:"Product not found"})
         }
         else{
            const productsreview = {
                userid:req.params.userid,
                review_comments:req.body.review_comments,
                ratings:req.body.ratings
            }
            const newreview = new review({
                pordid:prodid,
                product:productsreview,
            })

            await newreview.save().then(()=>{
                res.status(201).json({success:true,msg:"Reviewcreated successfully!"}).then(err =>{
                    res.status(401).json({success:false,err:err})
                })
            })
         }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"});
    }
}
const deletereviews =async(req,res)=> {
    const review_id = req.params.reviewid;
    const userid = req.userid;
    try{
        const findreview = await review.findById({_id:review_id})
        if(findreview){
            const checkvalid_deletion_by_valid_user =  await findreview.userId == userid;
            if(checkvalid_deletion_by_valid_user){
                await findreview.delete().then(()=>{ res.status(200).json({success:true,msg:"Comment deleted successfully!"}).catch(err=>{
                    console.log(err)       
                    res.status(401).json({msg:"Error deleting comment!"});        
                 })
                })
            }
            else{
                res.status(401).json({success:false,msg:"You can only delete only your comment"})
            }
        }
        else{
            res.status(404).json({success:false,msg:"Review not found"}); 
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"});
    }
}

module.exports = {createreview,deletereviews}