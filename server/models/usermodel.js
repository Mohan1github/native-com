const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userschema = new schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    phone:{
        type:Number,
        required:true
    },
    isBlocekd:{
        type:Boolean,
        default:false,
    }
},{timestapms:true})
const user = mongoose.model("user",userschema);
module.exports = user;
