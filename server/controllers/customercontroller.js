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
const deletecustomer = async(req,res)=>{
    const id = req.params.id;
    try{
        const findanddelete = await customer.findByIdAndDelete({_id:id});
        if(findanddelete){
            res.status(200).json({success:true,msg:"customer deleted"})
        }
        else{
            res.status(401).json({success:false,msg:"error deleting customer"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"ineternal server error!"});
    }
}
const createcustomer = async(req,res)=>{
    const cusname = req.body.name;
    try{
        const findcustomer = await customer.findOne({name:cusname});
        if(findcustomer){
            res.status(401).json({success:false,msg:"customer already exist"});
        }
        else{
            const newcustomer = new customer(req.body)
            newcustomer.save().then(()=>{
                consolo.log("Success")
                res.status(200).json({success:true,msg:"customer created successfully"})
            }).catch((err)=>{
                cosole.log(err);
                res.status(401).json({success:false,msg:"Something went wrong!"});
            })
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"ineternal server error!"});
    }
}
module.exports = {getcustomers,getcustomerbyid,deletecustomer,createcustomer}