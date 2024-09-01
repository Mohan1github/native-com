const product = require("../models/productmodel")
const createproduct = async(req,res) =>{
    const body = req.body;
    try{
        const exist = await product.find({title:body.title})
        if(exist){
            res.status(401).json({success:false,msg:"product already exist"})
        }else{

            const categories = req.body.categories.split(" ");
            const newproduct = new product({
                title:body.title,
                desc:body.desc,
                image:body.image,
                categories:categories,
                color:body.body,
                size:body.size,
                price:body.price,

            })
            await newproduct.save().then(()=>{
                res.status(201).json({success:true,msg:"product created successfully"})
            }).catch((err)=>{
                console.log(err);
                res.status(401).json({success:false,msg:"Error while creating new product"})
            })
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error",err:err})
    }
}
const getallproduct = async(req,res)=>{
    const qcategory = req.query.category;
    const qlatest = req.query.latest;
    let products;
    try{
        if(qlatest){
         products = await product.find().sort({createdAt:-1}).limit(5);}
         else if(qcategory){
            product = await product.find({
                category:{
                    $in:[qcategory]
                }
            })
         }
        if(products.lenght>0){
           
        }
        else{
            product = await product.find();
        }
        return res.status(200).json({success:true,data:products})
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error",err:err})
    }
}
const getproductbyid = async(req,res)=>{
    const id = req.params.id;
    try{
        const product = await product.fondById({id:id})
        if(product){
            res.status(200).json({success:true,data:product})
        }
        else{
            res.status(404).json({success:false,msg:"product not found"});
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error",err:err})
    }
}
const deleteproduct = async(req,res)=>{
    const id = req.params.id;
    try{
        const actiondel = await product.findByIdAndDelete({id:id})
        if(actiondel){
             res.status(200).json({success:true,msg:"Product deleted successfully"})
        }
        else{
            res.status(401).json({success:false,msg:"something went wrong"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error",err:err})
    }
}
const updateproduct = async(req,res)=>{
    const id = req.params.id;
    try
    {
        const updated = await product.findByIdAndDelete({id:id},{
            $set:req.body
        },{
            new:true
        })
        if(updated){
            res.status(200).json({success:true,msg:
                "product updated successfully"
            })
        }else{
            res.status(401).json({success:false,msg:"not updated"})
        }
    }
    catch(err){
        res.status(500).json({success:false,msg:"Internal server error",err:err})
    }
    
}
module.exports = {getallproduct,getproductbyid,deleteproduct,updateproduct,createproduct}