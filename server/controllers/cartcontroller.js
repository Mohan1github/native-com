const cart = require("../models/cartmodel")

const createcart = async(req,res) =>{
    const body = req.body;
    try{
        const exist = await cart.find({title:body.title})
        if(exist){
            res.status(401).json({success:false,msg:"cart already exist"})
        }else{
            const newcart = new product({
                    userid:req.userid,
                    des:req.body.desc,
                    products:products.push(req.body)
            })
            await newcart.save().then(()=>{
                res.status(201).json({success:true,msg:"cart created successfully"})
            }).catch((err)=>{
                console.log(err);
                res.status(401).json({success:false,msg:"Error while creating new cart"})
            })
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error"})
    }
}
const getallcart = async(req,res)=>{
    try{
        const carts = await cart.find()
        if(carts.lenght>0){
            res.status(200).json({success:true,data:carts})
        }
        else{
            res.status(404).json({success:false,msg:"data not found"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"internal server errror"});
    }
}
const getcartbyid = async(req,res)=>{
    const id = req.params.id;
    try{
        const cart = await cart.fondById({_id:id})
        if(cart){
            res.status(200).json({success:true,data:cart})
        }
        else{
            res.status(404).json({success:false,msg:"cart not found"});
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"internal server error"})
    }
}
const deletecart = async(req,res)=>{
    const id = req.params.id;
    try{
        const actiondel = await cart.findByIdAndDelete({_id:id})
        if(actiondel){
             res.status(200).json({success:true,msg:"cart deleted successfully"})
        }
        else{
            res.status(401).json({success:false,msg:"something went wrong"})
        }
    }
    catch(err){
        res.status(500).json({success:false, msg:"internal server error"
        })
    }
}
const updatecart = async(req,res)=>{
    const id = req.params.id;
    try
    {
        const updated = await cart.findByIdAndDelete({_id:id},{
            $set:req.body
        },{
            new:true
        })
        if(updated){
            res.status(200).json({success:true,msg:
                "cart updated successfully"
            })
        }else{
            res.status(401).json({success:false,msg:"not updated"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"internal server error"})
    }
    
}
module.exports = {getallcart,getcartbyid,deletecart,updatecart,createcart}