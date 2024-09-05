const express = require("express")
const customer = require("../models/customermodel")

const getcustomers = async(req,res)=>{
    try{
        const customerdata =  await customer.find();
        if(customerdata.lenght> 0){
            res.status(200).json({success:true,data:customerdata});
        }
        else{
            res.status(404).json({succcess:false,msg:"Data not found!"})
        }
    }
    catch(err){
            res.status(500).json({success:false,msg:"ineternal server error!"})
    }
}
const getcustomerbyid = async(req,res)=>{
    const id = req.params.id;
    try{
        const customerdetails = await customer.findById({_id:id})
        if(customerdetails){
            res.status(200).json({success:true,data:customerdata});
        }
        else{
            res.status(404).json({success:false,msg:"data not found"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"ineternal server error!"});
    }
}
module.exports = {getcustomers,getcustomerbyid}