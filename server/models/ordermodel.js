const mongoose = require("mongoose")
const schema = mongoose.Schema
const orderschema = new schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    produtcs:[{

        productid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    amount:{
        type:Number,
        required:true    
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
},
{
    timestamps:true
}
)
const order = mongoose.model("order",orderschema)
module.exports = {order};