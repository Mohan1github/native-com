const order = require("../models/ordermodel")
const user = require("../models/usermodel")
const createorder = async(req,res)=>{
    try{
        const neworder = new order(req.body)
        await neworder.save().then(()=>{
            consolo.log("order created");
            res.status(201).json({success:true,mag:"order created"})
        }).catch((err)=>{
            res.status(401).json({err:err})
        })
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"})
    }
}

const cancelorder = async(req,res)=>{
    const id = req.params.id;
    try{
        const deleteorder = await order.findBIdAndDelete({_id:id})
        if(deleteorder){
            res.status(200).json({success:true,msg:"order cancelled successfully!"})
        }
        else{
            res.status(401).json({success:false,msg:"order not cancelled!"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"})
    }
}
const getorders = async(req,res) =>{
    const userId = req.userid;
    try{
        const orderslist = await user.findById({_id:userId}).populate("order").sort({createdAt:-1})
        if(orderslist){
            res.status(200).json({success:true,orders:orderslist})
        }
        else{
            res.status(404).json({success:false,msg:"Orders not found!"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"})
    }
}
module.exports = {createorder,cancelorder,getorders};
