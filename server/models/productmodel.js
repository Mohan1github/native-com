const mongoose = require("mongoose")
const schema = mongoose.Schema;
const productschema = new schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        default:[]
    },
    color:{
        type:String,
        required:true,
    },
    size:{
        type:String
    },
    price:{
        type:Number
    }
},
{
    timestamps:true
}
)
const product = mongoose.model("products",productschema)
module.exports = product;