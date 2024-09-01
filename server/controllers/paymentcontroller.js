const Stripe = require("stripe")(process.env.STRIPE_SECRET)

const stripe = async (req,res)=>{
    Stripe.charges.create({
        source:req.body.tokenid,
        amount:req.body.amount,
        currency:"inr",
    },(err,res)=>{
        if(err){
            res.status(500).json({err:err})
        }
        else{
            res.status(200).json({res:res})
        }
    })
};
module.exports = {stripe};