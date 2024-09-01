const express = require("express")
const mongoose = require("mongoose")
const {user} = require("../models/usermodel")

const getalluser = async(req,res)=>{
    try{
        const users = await user.find()
        if(users.length > 0){
            res.status(200).json({msg:"Data found",data:users})    
        }
        else{
            res.status(404).json({msg:"No data found"});
        }
    }
    catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}

const getuser = async(req,res)=>{
    const id = req.params.id;
    try{
        const userdata = await user.findById({id:id})
        const{password:pass,...rest} = userdata._doc
        if(userdata){
            res.status(200).json({msg:"Data found",data:rest})
        }
    }
    catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}
const deleteuser = async(erq,res)=>{
    const id = req.params.id;
    try{
        const finduser = await user.findByIdAndDelete({id:id})
        if(finduser){
            res.status(200).json({msg:"user deleted successfully"})
        }
        else{
            res.status(401).json({msg:"Error while deleting the user"})
        }
    }
    catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}
const updateuser = async(req,res)=>{
    const id = req.params.id;
    try{
        const find = await user.findById({id:id},{$set:req.body},{new:true},(err,resdata)=>{
            if(err){
                res.status(401).json({msg:"something went wrong in updating users"})
            }
            else{
                res.send(resdata.toString())
            }
        })
        if(find){
            res.status(200).json({msg:"Updated"})
        }
        else{
            res.status(401).json({msg:" not Updated"})
        }
    }
    catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}
const blockuser = async(req,res)=>{
    const id = req.body
    try{
        const finduser = await user.findById({id:id})
        if(finduser){
            if(finduser.isBlocked == true){
                res.status(401).json({msg:"User already blocked"});
            }
        }
        else{
            const blocking = await finduser.update({isBlocekd:true},{new:true}).save()
            if(blocking){
                res.status(200).json({msg:"userblocked successfully",success:true})
            }
            
        }
    }
    catch(err){
        res.status(500).json({msg:"Internal server error"})
    }
}
const unblockuser = async(req,res)=>{
    const id = req.body
    try{
        const finduser = await user.findById({id:id})
        if(finduser){
            if(finduser.isBlocked == false){
                res.status(401).json({msg:"User already unblocked"});
            }
        }
        else{
            const unblocking = await finduser.update({isBlocekd:false},{new:true}).save()
            if(unblocking){
                res.status(200).json({msg:"user unblocked successfully",success:true})
            }   
        }
    }
    catch(err){
        res.status(500).json({msg:"Internal server error"})
    }

}
const blockedusers = async(req,res)=>{
    try{
        const data = await user.filter((k)=>{k.isBlocked == true})
        if(data.length > 0){
            res.status(200).json({success:true,data:data,size:data.length})
        }else{
            res.status(401).json({msg:"No user blocked!"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"})
    }
}
module.exports = {getalluser,getuser,deleteuser,updateuser,blockuser,unblockuser,blockedusers}

