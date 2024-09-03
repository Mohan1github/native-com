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

const deleteorder = async(req,res)=>{
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
        const dispatched = orderlist.filter((k)=>{
            k.status === "dispatched"
        })
        if(orderslist){
            res.status(200).json({success:true,orders:orderlist,dispatcheddata:dispatched})

        }
        else{
            res.status(404).json({success:false,msg:"Orders not found!"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"})
    }
}
const getpendingorders = async(req,res)=>{
    try{
        const pendingorders = await order.filter((k) =>{
            k.status === "pending"
        })
        if(pendingorder.lenght> 0){
            res.status(200).json({success:false,pendingordersdata:pendingorders})
        }
        else{
            res.status(404).json({msg:"No pending order found!"})
        }
        
    }
    catch(err){
        res.staus(500).json({success:false,msg:"Internal server error"})
    }
}
const orderstatuschanger = async(req,res) =>{
    const orderid  = req.params.productId
    const state = req.body.status;
    try{
        const findorder = await order.findById({_id:orderid})
        if(findorder){
                if(state === "delivered"){
                    await findorder.status.$set(state);
                     findorder.save().then(()=>{
                        res.staus(200).json({success:true,msg:"order status updated!"});
                    })
                }
        }
    }
    catch(err){
            res.status(500).json({success:false,msg:"Internal server error!"})
    }
}
const cancelorder = async(req,res)=>{
    try{
        const findorder = await order.findById({_id:req.params.id})
        if(findorder.status === "pending" || findorder.status === "dispatched"){
             findorder.status.$set("cancelled").save().then(()=>{
                res.status(200).json({success:true,msg:"order cancelled successfully"})
            })
        }
        else{
            res.status(401).json({success:false,msg:"not able to cancel order"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error!"})
    }
}
module.exports = {createorder,deleteorder,getorders,getpendingorders,orderstatuschanger,cancelorder};
