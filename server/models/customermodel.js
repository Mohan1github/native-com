const mongoose = require("mongoose")
const Schema = mongoose.Schema
const customermodel = new Schema({
    name:{
        type:String,
        required:true,
    },
    business_type:[{
        type:String,
    }],
    product_types:[{
        type:String,
        required:true
    }],

},{timestamps:true});
const customer = mongoose.model("customer",customermodel)
module.exports = {customer}
