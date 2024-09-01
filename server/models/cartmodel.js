const mongoose = require("mongoose")
const schema = mongoose.Schema
const cartschema = new schema({
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
            type:String
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
   
    
},
{
    timestamps:true
}
)
const cart = mongoose.model("cart",cartschema)
module.exports = cart;